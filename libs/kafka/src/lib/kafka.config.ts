import { ConfigService } from '@nestjs/config'
import { ClientsModuleAsyncOptions, KafkaOptions, Transport } from '@nestjs/microservices'
import { Kafka } from 'kafkajs'

export const kafkaConfig = ({
  broker,
  username,
  password,
}: {
  broker: string
  username: string
  password: string
}): Kafka => {
  const kafka = new Kafka({
    brokers: [broker],
    ssl: true,
    sasl: {
      mechanism: 'plain',
      username,
      password,
    },
  })

  return kafka
}

export const kafkaMicroserviceConfig = ({
  broker,
  consumerId,
  username,
  password,
}: {
  broker: string
  consumerId: string
  username: string
  password: string
}): KafkaOptions => ({
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: [broker],
      ssl: true,
      sasl: {
        mechanism: 'plain',
        username,
        password,
      },
    },
    consumer: {
      groupId: consumerId,
    },
  },
})

export const kafkaClientConfig = ({
  name,
  clientId,
  consumerId,
}: {
  name: string
  clientId: string
  consumerId: string
}): ClientsModuleAsyncOptions => {
  return [
    {
      name,
      useFactory: (config: ConfigService) => ({
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId,
            brokers: [config.get('KAFKA_URL')],
            ssl: true,
            sasl: {
              mechanism: 'plain',
              username: config.get('KAFKA_API_KEY'),
              password: config.get('KAFKA_API_SECRET'),
            },
          },
          consumer: {
            groupId: consumerId,
          },
        },
      }),
      inject: [ConfigService],
    },
  ]
}
