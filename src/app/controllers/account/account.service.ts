import * as crypto from 'node:crypto';

import { AccountEntity } from '@app/database';
import { ConfirmationAction, DBConnectionName } from '@app/enums';
import { IUploadedFile } from '@app/interfaces';
import { AppConfirmationService, S3Service } from '@app/services';
import { assert } from '@app/utilities';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import { Repository } from 'typeorm';

import { ChangePasswordDTO, UpdateDTO } from './dto';

@Injectable()
export class AccountService {
    constructor(
        @InjectRepository(AccountEntity, DBConnectionName.PostgresSQL)
        public readonly accountRepository: Repository<AccountEntity>,
        private readonly appConfirmationService: AppConfirmationService,
        private readonly s3Service: S3Service,
    ) {}

    async me(user: Express.User): Promise<AccountEntity> {
        const account = await this.accountRepository.findOneBy({ id: user.id });
        assert(!!account, () => new NotFoundException('Account not found'));
        return account;
    }

    async update(payload: UpdateDTO, user: Express.User): Promise<AccountEntity> {
        const account = await this.accountRepository.findOneBy({ id: user.id });
        assert(!!account, () => new NotFoundException('Account not found'));
        return this.accountRepository.save({ ...instanceToPlain(account), ...payload });
    }

    async changePassword(payload: ChangePasswordDTO, user: Express.User) {
        const account = await this.accountRepository.findOneBy({ id: user.id });
        assert(!!account, () => new NotFoundException('Account not found'));

        const passwordMatched = await bcrypt.compare(payload.oldPassword, account.password);
        assert(passwordMatched, () => new BadRequestException('Wrong password'));

        await this.appConfirmationService.confirm({
            accountId: user.id,
            action: ConfirmationAction.PasswordChange,
            token: payload.token,
        });

        account.password = await bcrypt.hash(payload.newPassword, 10);
        await this.accountRepository.save(account);
    }

    async changeProfilePhoto(file: IUploadedFile, user: Express.User): Promise<AccountEntity> {
        const account = await this.accountRepository.findOneBy({ id: user.id });
        assert(!!account, () => new NotFoundException('Account not found'));

        const Bucket = this.s3Service.getPublicBucketName();
        const s3ProfilesPhotosDir = this.s3Service.getProfilePhotosDir();

        if (account.profilePhotoID) {
            const currentProfilePhotoKey = s3ProfilesPhotosDir + '/' + account.profilePhotoID;
            const deleteObjectCommand = new DeleteObjectCommand({ Bucket, Key: currentProfilePhotoKey });
            await this.s3Service.s3.send(deleteObjectCommand);
        }

        const profilePhotoID = crypto.randomUUID();
        const NewKey = s3ProfilesPhotosDir + '/' + profilePhotoID;

        const putObjectCommand = new PutObjectCommand({
            Bucket,
            Key: NewKey,
            Body: file.buffer,
            ACL: 'public-read',
            ContentType: 'image/jpeg',
        });

        await this.s3Service.s3.send(putObjectCommand);
        await this.accountRepository.update(account.id, { profilePhotoID });

        return this.accountRepository.findOneBy({ id: user.id });
    }
}
