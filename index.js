const discord = require('discord.js')
const client = new discord.Client()


client.login('Njk2Mjg4NTQxNjI1NTQ4ODIx.XomkqQ.EST9kZi7XQhONHSE6yQ588PBIWg')

client.on('message', async msg => {
    const channel = msg.channel

    const [command, ...args] = msg.content.split(/[\s\/]/)
    if(command === '.d'){
        const isUp = args[2] === 'up'

        console.log(msg.createdAt)

        channel.messages.fetch({
            before: args[0 ^ isUp],
            after: args[1 ^ isUp],
            limit: 50
        }).then( response => { 
            response.map( mensagem => mensagem.delete({
                timeout: 200
            }))  
        })  
    }
});