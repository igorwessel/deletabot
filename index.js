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
    let date;
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
          response.sort((responseA, responseB ) => (responseA.createdAt < responseB.createdAt)? 1:-1 )
        response.map( msg => {
           date = new moment(msg.createdTimestamp)
            console.log(date.format("hh:mm"))
        })
        response.map((msg) => {
          if (
            date1.isBefore(new moment(msg.createdAt)) &&
            date2.isAfter(new moment(msg.createdAt))
          )
            msg.delete({
              timeout: 0,
            })
        })
      })
  }
  if(msg.content.includes('.d'))
    msg.delete()
});
