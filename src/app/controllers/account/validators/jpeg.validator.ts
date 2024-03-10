import { FileValidator } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';

export class JPEGFileTypeValidator extends FileValidator {
    isValid(file: IFile[] | Record<string, IFile[]> | IFile | undefined): boolean | Promise<boolean> {
        const buffer = (file as any).buffer;
        return buffer[0] === 0xFF && buffer[1] === 0xD8;
    }

    buildErrorMessage(): string {
        return '';
    }
}
