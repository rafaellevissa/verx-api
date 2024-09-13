import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

type Options = {
  arableArea: string
  vegetationArea: string
}

async function validateAreas(value: unknown, options: Options, field: FieldContext) {
  const { arableArea, vegetationArea } = options

  const arableAreaHectares = field.data.farm[arableArea]
  const vegetationAreaHectares = field.data.farm[vegetationArea]

  if (isNaN(arableAreaHectares) || isNaN(vegetationAreaHectares) || isNaN(parseFloat(value as any)) || arableAreaHectares + vegetationAreaHectares > parseFloat(value as any)) {
    field.report('The sum of arable and vegetation areas exceeds the total area','validateAreas', field)
  }
}

const validateAreasRule = vine.createRule(validateAreas)

export const createProducerValidator = vine.compile(
  vine
    .object({
      name: vine.string().trim().maxLength(255),
      document: vine.string().trim().maxLength(20),
      farm: vine.object({
        name: vine.string().trim().maxLength(255),
        arableAreaHectares: vine.number(),
        vegetationAreaHectares: vine.number(),
        totalAreaHectares: vine.number().use(validateAreasRule({ 
          arableArea: 'arableAreaHectares',
          vegetationArea: 'vegetationAreaHectares',
        })),
        address: vine.object({
          city: vine.string().trim().maxLength(100),
          state: vine.string().trim().maxLength(2),
        }),
        cultures: vine.array(vine.number()),
      }),
    })
)

export const updateProducerValidator = vine.compile(
  vine.object({
    name: vine.string().trim().maxLength(255).optional(),
    document: vine.string().trim().maxLength(20).optional(),
    farm: vine.object({
      name: vine.string().trim().maxLength(255).optional(),
      arableAreaHectares: vine.number().optional(),
      vegetationAreaHectares: vine.number().optional(),
      totalAreaHectares: vine.number().use(validateAreasRule({ 
        arableArea: 'arableAreaHectares',
        vegetationArea: 'vegetationAreaHectares',
        })).optional(),
      address: vine.object({
        city: vine.string().trim().maxLength(100).optional(),
        state: vine.string().trim().maxLength(2).optional(),
      }).optional(),
      cultures: vine.array(vine.number()).optional(),
    }).optional(),
  })
)
