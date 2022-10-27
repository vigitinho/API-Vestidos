import { v4 as uuidv4 } from 'uuid'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Vestido from 'App/Models/Vestido'

import Application from '@ioc:Adonis/Core/Application'

export default class VestidosController {
  private validationOptions = {
    type: ['image'],
    size: '2mb',
  }

  public async store({ request, response }: HttpContextContract) {
    const body = request.body()

    const image = request.file('image', this.validationOptions)

    if (image) {
      const imageName = `${uuidv4()}.${image.extname}`

      await image.move(Application.tmpPath('uploads'), {
        name: imageName,
      })

      body.image = imageName
    }

    const vestido = await Vestido.create(body)

    response.status(201)

    return {
      message: 'O vestido Foi criado com sucesso!',
      data: vestido,
    }
  }

  public async index() {
    const vestidos = await Vestido.query().preload('comments')

    return {
      data: vestidos,
    }
  }

  public async show({ params }: HttpContextContract) {
    const vestido = await Vestido.findOrFail(params.id)

    await vestido.load('comments')

    return {
      data: vestido,
    }
  }

  public async destroy({ params }: HttpContextContract) {
    const vestido = await Vestido.findOrFail(params.id)

    await vestido.delete()

    return {
      message: 'Vestido excluido com sucesso!',
      data: vestido,
    }
  }

  public async update({ params, request }: HttpContextContract) {
    const body = request.body()

    const vestido = await Vestido.findOrFail(params.id)

    vestido.title = body.title
    vestido.description = body.description
    vestido.color = body.color
    vestido.value = body.valor
    vestido.style = body.style

    if (vestido.image !== body.image || !vestido.image) {
      const image = request.file('image', this.validationOptions)

      if (image) {
        const imageName = `${uuidv4()}.${image.extname}`

        await image.move(Application.tmpPath('uploads'), {
          name: imageName,
        })

        vestido.image = imageName
      }
    }

    await vestido.save()

    return {
      message: 'Vestido Atualizado com sucesso!',
      data: vestido,
    }
  }
}
