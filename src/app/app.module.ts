import { Module } from '@nestjs/common';
import { WidgetModule } from '@modules/widget/widget.module';

@Module({
  imports: [ WidgetModule ]
})
export class AppModule {
}
