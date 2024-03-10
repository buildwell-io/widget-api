import { StripeService } from '@app/services';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import { AccountService } from '../account/account.service';
import { CustomerUpdateDTO } from './dto/customer-update.dto';

@Injectable()
export class AccountBillingService {
    constructor(private readonly accountService: AccountService, private readonly stripeService: StripeService) {}

    async retrieveStripeCustomer(user: Express.User) {
        return this.getOrCreateCustomer(user.id);
    }

    async updateStripeCustomer(user: Express.User, params: CustomerUpdateDTO) {
        const customer = await this.getOrCreateCustomer(user.id);
        return this.stripeService.stripe.customers.update(customer.id, params);
    }

    async addPaymentMethod(user: Express.User) {
        const customer = await this.getOrCreateCustomer(user);
        return this.stripeService.stripe.setupIntents.create({ customer: customer.id });
    }

    async retrievePaymentMethods(user: Express.User) {
        const customer = await this.getOrCreateCustomer(user);
        return this.stripeService.stripe.paymentMethods.list({
            customer: customer.id,
            type: 'card',
        });
    }

    private async getOrCreateCustomer(user: Express.User, params?: Stripe.CustomerCreateParams) {
        const { id, stripeCustomerId, name, email } = await this.accountService.me(user);

        if (!stripeCustomerId) {
            const customer = await this.stripeService.stripe.customers.create({
                name,
                email,
                metadata: {
                    buildwellAccountId: id,
                },
                ...params,
            });

            await this.accountService.accountRepository.update({ id }, { stripeCustomerId: customer.id });

            return customer;
        }

        return this.stripeService.stripe.customers.retrieve(stripeCustomerId);
    }
}
