import { AccountType } from '@app/decorators';
import { AccountType as AccountTypeEnum } from '@app/enums';
import { Controller, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CompanyService } from './company.service';

@ApiTags('company')
@Controller('company')
@AccountType(AccountTypeEnum.Company, AccountTypeEnum.CompanyMember)
@ApiBearerAuth()
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer <access_token>' })
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
export class CompanyController {
    constructor(private readonly companyService: CompanyService) {}
}
