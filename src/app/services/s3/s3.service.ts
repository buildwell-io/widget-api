import { S3Client, S3ClientConfig } from '@aws-sdk/client-s3';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { MODULE_OPTIONS_TOKEN } from './s3.module-definition';

@Injectable()
export class S3Service {
    public readonly s3: S3Client;

    constructor(
        @Inject(MODULE_OPTIONS_TOKEN) options: S3ClientConfig,
        private readonly configService: ConfigService,
    ) {
        this.s3 = new S3Client(options);
    }

    getPublicBucketName(): string {
        return this.configService.get('S3_PUBLIC_BUCKET_NAME');
    }

    getCDNBaseURL(): string {
        return this.configService.get('S3_CDN_BASE_URL');
    }

    getProfilePhotosDir(): string {
        return this.configService.get('S3_PROFILE_PHOTOS_DIR');
    }

    getPublicCDNBaseURL(): string {
        const CDNBaseURL = this.getCDNBaseURL();
        const publicBucketName = this.getPublicBucketName();
        return 'https://' + publicBucketName + '.' + CDNBaseURL;
    }
}
