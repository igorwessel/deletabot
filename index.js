const discord = require("discord.js");
const client = new discord.Client();
const moment = require("moment");
require("dotenv/config");

client.login(process.env.TOKEN);

client.on("message", async (msg) => {
  const channel = msg.channel;

  const [command, ...args] = msg.content.split(/[\s\/]/);
  if (command === ".d") {
    let date1;
    let date2;

    channel.messages
      .fetch({
        limit: 50,
      })
      .then((response) => {
        response.map((mensagem) => {
          if (mensagem.author.id == msg.author.id) {
            if (mensagem.id == args[0]) {
              date1 = new moment(mensagem.createdAt);
              mensagem.delete({
                timeout: 0,
              });
            }

            if (mensagem.id == args[1]) {
              date2 = new moment(mensagem.createdAt);
              mensagem.delete({
                timeout: 0,
              });
            }
          }
        });
      });

    channel.messages
      .fetch({
        limit: 50,
      })
      .then((response) => {
        response.map((msg) => {
          if (
            date1.isAfter(new moment(msg.createdAt)) &&
            date2.isBefore(new moment(msg.createdAt))
          )
            msg.delete({
              timeout: 0,
            });
        });
      });
  }
});
