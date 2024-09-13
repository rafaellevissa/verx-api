import { CultureFactory } from '#database/factories/culture_factory'
import { ProducerFactory } from '#database/factories/producer_factory'
import ProducerService from '#services/producers_service'
import { test } from '@japa/runner'

test.group('ProducersService', (group) => {
  let producerService: ProducerService

  group.each.setup(() => {
    producerService = new ProducerService()
  })

  test('getAllProducers returns all producers', async ({ assert }) => {
    const producers = await ProducerFactory.with('farm', 1, (farm) => {
      farm.with('location')
      farm.with('cultures', 2)
    }).createMany(3)

    const result = await producerService.getAllProducers()

    assert.equal(result.length, 3)
    assert.includeMembers(
      result.map(producer => producer.id), 
      producers.map(producer => producer.id)
    )
  })

 test('getProducerById returns a specific producer', async ({ assert }) => {
    const createdProducer = await ProducerFactory.with('farm', 1, (farm) => {
      farm.with('location')
      farm.with('cultures', 2)
    }).create()

    const producer = await producerService.getProducerById(createdProducer.id.toString())

    assert.equal(producer.id, createdProducer.id)
    assert.equal(producer.name, createdProducer.name)
  })

  test('createProducer creates a new producer', async ({ assert }) => {
    const producerData = {
      document: '12345678901',
      name: 'John Doe',
    }
    const farmData = {
      name: 'Green Farm',
      total_area_hectares: 100,
      arable_area_hectares: 80,
      vegetation_area_hectares: 20,
    }
    const addressData = {
      city: 'São Paulo',
      state: 'SP',
    }
    const cultures = await CultureFactory.createMany(2)
    const cultureIds = cultures.map(culture => culture.id)

    const producer = await producerService.createProducer(producerData, farmData, addressData, cultureIds)

    assert.equal(producer.name, producerData.name)
    assert.equal(producer.farm.name, farmData.name)
    assert.equal(producer.farm.location.city, addressData.city)
    assert.equal(producer.farm.cultures.length, 2)
  })

})
