import { Body, Controller, Get, HttpStatus, Patch, Post, Req, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AccountBillingService } from './account-billing.service';
import { CustomerUpdateDTO } from './dto/customer-update.dto';

@ApiTags('account/billing')
@Controller('account/billing')
@ApiBearerAuth()
@ApiHeader({ name: 'Authorization', required: true, description: 'Bearer <access_token>' })
@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Account not found' })
export class AccountBillingController {
    constructor(private readonly accountBillingService: AccountBillingService) {}

    @Get('customer')
    @Version('1')
    @ApiOperation({ summary: 'Retrieve stripe customer information' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
    retrieveStripeCustomer(@Req() { user }: Express.Request) {
        return this.accountBillingService.retrieveStripeCustomer(user);
    }

    @Patch('customer')
    @Version('1')
    @ApiOperation({ summary: 'Update stripe customer information' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
    updateStripeCustomer(@Body() payload: CustomerUpdateDTO, @Req() { user }: Express.Request) {
        return this.accountBillingService.updateStripeCustomer(user, payload);
    }

    @Post('payment-methods')
    @Version('1')
    @ApiOperation({ summary: 'Add a payment method' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
    addPaymentMethod(@Req() { user }: Express.Request) {
        return this.accountBillingService.addPaymentMethod(user);
    }

    @Get('payment-methods')
    @Version('1')
    @ApiOperation({ summary: 'Get a list of payment methods' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
    retrievePaymentMethods(@Req() { user }: Express.Request) {
        return this.accountBillingService.retrievePaymentMethods(user);
    }
}
