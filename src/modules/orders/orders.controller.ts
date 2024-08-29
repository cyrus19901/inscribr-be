import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UnisatAddressBalance } from '@type/common';

import { OrdersCreateDto } from './dto/orders-create.dto';
import { OrdersCreateChiselDto } from './dto/orders-create-chisel.dto';
import { OrdersResponseChiselDto } from './dto/orders-response-chisel.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  async createOrder(@Body() body: OrdersCreateDto): Promise<any> {
    const result = await this.ordersService.createOrder(body);
    return result;
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async getOrdersById(@Query('orderId') orderId: string): Promise<any> {
    const result = await this.ordersService.getOrderById(orderId);
    return result;
  }

  @Get('/inscription/:id')
  @HttpCode(HttpStatus.OK)
  async getOrdersByInscriptionId(
    @Param('id') inscriptionId: string,
  ): Promise<any> {
    const result = await this.ordersService.getOrderByInscriptionId(
      inscriptionId,
    );
    return result;
  }

  @Post('/unwrap/order/create')
  @HttpCode(HttpStatus.OK)
  async createChiselOrder(
    @Body() body: OrdersCreateChiselDto,
  ): Promise<OrdersResponseChiselDto> {
    const result = await this.ordersService.createChiselOrder(body);
    return result;
  }

  @Get('/balance/:address')
  @HttpCode(HttpStatus.OK)
  async getBalanceUnisat(
    @Param('address') address: string,
  ): Promise<UnisatAddressBalance> {
    const utxoData = await this.ordersService.getUserBalance(address);
    return utxoData;
  }
}
