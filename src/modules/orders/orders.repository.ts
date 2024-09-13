import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { DataSource, Not, Repository } from 'typeorm';

import {
  ChiselOrderResponse,
  InscriptionTxResponse,
  UnisatAddressBalance,
} from '@type/common';

import { OrdersCreateDto } from './dto/orders-create.dto';
import { OrdersResponseChiselDto } from './dto/orders-response-chisel.dto';
import { OrdersEntity } from '@entities/orders.entity';

@Injectable()
export class OrdersRepository extends Repository<OrdersEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(OrdersEntity, dataSource.createEntityManager());
  }
  async createOrder(dto: OrdersCreateDto): Promise<OrdersEntity> {
    const order = this.create(dto);
    return await this.save(order);
  }

  async createChiselOrder(
    userAddress: string,
    feeRate: string,
    compress?: string,
    postage?: string,
    files?: Blob[],
  ): Promise<OrdersResponseChiselDto> {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('inscriptions', file);
      });

      formData.append('fee_rate', feeRate);
      formData.append('postage', postage);
      compress ?? formData.append('compress', compress);
      formData.append('ordinal_receive_address', userAddress);
      const { data } = await axios.post(
        'https://chisel.xyz/api/inscribe',
        formData,
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  async getOrderById(orderId: string): Promise<OrdersEntity> {
    const order = await this.findOneBy({
      orderId: orderId,
    });
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }

  async getOrderByInscriptionId(inscriptionId: string): Promise<OrdersEntity> {
    const order = await this.findOne({
      where: { inscriptionId: inscriptionId },
      order: { createdAt: 'DESC' },
    });
    return order;
  }

  async getChiselOrder(orderId: string): Promise<ChiselOrderResponse> {
    const { data } = await axios.get(
      `https://chisel.xyz/api/inscription/${orderId}/status`,
    );
    return data;
  }

  async getTransactionStatus(txId: string): Promise<InscriptionTxResponse> {
    const { data } = await axios.get(`https://mempool.space/api/tx/${txId}`);
    return data;
  }

  async getUserBalance(address: string): Promise<UnisatAddressBalance> {
    const { data } = await axios.get(
      `https://open-api.unisat.io/v1/indexer/address/${address}/balance`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_UNISAT_TOKEN}`,
        },
      },
    );
    return data;
  }
}
