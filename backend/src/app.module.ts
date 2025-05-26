import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [PrismaModule, ProductsModule, MessagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
