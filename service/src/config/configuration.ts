export default () => ({
  host_rabbitmq: process.env.FILA_HOST_RABBITMQ,
  download_image: process.env.FILA_DOWNLOAD_IMAGE,
  download_image_receive_count: process.env.FILA_DOWNLOAD_IMAGE_RECEIVE_COUNT,
  download_image_received: process.env.FILA_DOWNLOAD_IMAGE_RECEIVED,
  database: {
    host: process.env.MONGODB,
  },
});
