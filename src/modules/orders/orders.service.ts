import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UnisatAddressBalance } from '@type/common';

import { OrdersDto } from './dto/orders.dto';
import { OrdersCreateDto } from './dto/orders-create.dto';
import { OrdersCreateChiselDto } from './dto/orders-create-chisel.dto';
import { OrdersResponseChiselDto } from './dto/orders-response-chisel.dto';
import { OrdersRepository } from './orders.repository';
import { SomethingWentWrongException } from '@exceptions/something-went-wrong';

@Injectable()
export class OrdersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly ordersRepository: OrdersRepository,
  ) {}

  validateGenericApiKey(apiKey: string) {
    if (apiKey !== this.configService.get('WEBHOOK_API_KEY')) {
      throw new BadRequestException();
    }
  }

  async createOrder(order: OrdersCreateDto): Promise<OrdersDto> {
    try {
      const orderResult = await this.ordersRepository.createOrder(order);
      return orderResult;
    } catch (error) {
      if (error?.detail) {
        throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(error.response, HttpStatus.BAD_REQUEST);
      }
    }
  }

  async getOrderById(orderId: string): Promise<OrdersDto> {
    try {
      const orderResult = await this.ordersRepository.getOrderById(orderId);
      return orderResult;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }

  async getOrderByInscriptionId(inscriptionId: string): Promise<OrdersDto> {
    try {
      const orderResult = await this.ordersRepository.getOrderByInscriptionId(
        inscriptionId,
      );
      return orderResult;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST, {
        cause: error,
      });
    }
  }

  async createChiselOrder(
    orderObject: OrdersCreateChiselDto,
  ): Promise<OrdersResponseChiselDto> {
    const inscriptions = await this.ordersRepository.createChiselOrder(
      orderObject.userAddress,
      orderObject.inscriptionId,
      orderObject.fees,
    );
    if (!inscriptions) {
      throw new SomethingWentWrongException();
    }
    return inscriptions;
  }

  async getUserBalance(address: string): Promise<UnisatAddressBalance> {
    const utxo = await this.ordersRepository.getUserBalance(address);
    if (!utxo) {
      throw new SomethingWentWrongException();
    }
    return utxo;
  }
}
