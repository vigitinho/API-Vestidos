import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('/vestidos', 'VestidosController').apiOnly()

  Route.post('/vestidos/:vestidoId/comments', 'CommentsController.store')
}).prefix('/api')
