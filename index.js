require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } =require('discord.js');
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`)
});


client.on('messageCreate', (message) => {
    if (message.author.bot){
        return;
    }
    if (message.content === 'hello'){
        message.reply('hello');
    }
});

//reset token at https://discord.com/developers/applications/1163020326611992706/bot and copy the token in the login
client.login(process.env.TOKEN);
//type nodemon to start bot


client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    //data
    if(interaction.commandName === 'data'){
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
              respond({"content": `This server's special key is: ${data["SpecialKey"]}!`});
            } else {
              new Schema ({
                Guild: interaction.guild.id,
                SpecialKey: "Examples ✨"
              }).save()
          
              respond({"content": `Woah! This server doesn't have a key yet 👀 I've just set yours to the default key instead!`});
            }
          });
    }
    //help
    if(interaction.commandName === 'help'){
        const embed =  new EmbedBuilder()
            .setTitle('Welcome to Casino Bot :black_joker: ')
            .setDescription(':spades: This is a bot consisting of games played in the casino:diamonds: ')
            .setColor('Random')
            .addFields(
                {   
                name: ':clubs:To play, type / and look through all the options and chosoe the game you would like to play:hearts: ',
                value: 'Remember, 90% of gamblers quit before winning big :money_mouth: '
                }
                )
        interaction.reply({ embeds: [embed]});
            }
 
    //rock paper scissor
    const rockpaperscissor = ['Rock', 'Paper', 'Scissor'];
    const randomrps = Math.floor(Math.random()*rockpaperscissor.length);
    const winnerrpc = (user_input,bot_input) =>{
        if (user_input === bot_input){
            return 'Draw';
        }
        if ((user_input === 'Rock' && bot_input == 'Scissor') || 
            (user_input === 'Paper' && bot_input == 'Rock') ||
            (user_input === 'Scissor' && bot_input == 'Paper')){
                return "You win"
            }
        else{
            return "You lost"
        }
    };
    if(interaction.commandName === 'rock-paper-scissor'){
        const user_inputrpc = interaction.options.get('user-input')?.value;
        const embed =  new EmbedBuilder()
            .setTitle('Rock paper scissor')
            .setDescription('You will play a match of rock paper scissor with the bot')
            .setColor('Random')
            .addFields(
                {   
                name: `Results:
${user_inputrpc} vs ${rockpaperscissor[randomrps]}`, 
                value: `${winnerrpc(user_inputrpc,rockpaperscissor[randomrps])}`
                }
                )
        interaction.reply({ embeds: [embed]});
    };

    //blackjack
    const cards = [2,3,4,5,6,7,8,9,10,10,10,10,11];
    const randombjuser1 = Math.floor(Math.random()*cards.length);
    const randombjuser2 = Math.floor(Math.random()*cards.length);
    const randombjbot1 = Math.floor(Math.random()*cards.length);
    const randombjbot2 = Math.floor(Math.random()*cards.length);
    const usernum = cards[randombjuser1] + cards[randombjuser2];
    const botnum = cards[randombjbot1] + cards[randombjbot2];
    const winnerbj = (usernum,botnum) =>{
        if(usernum === botnum){
            return 'Tie'
        }
        if (usernum === 21){
            return 'You hit a Blackjack, you won'
        }
        if (botnum === 21){
            return 'Dealer hit a Blackjack, you lost'
        }
        if(botnum> 21 && usernum> 21){
            return 'Both player and dealer are over 21'
        }
        if(usernum > 21){
            return 'You are over 21, you lost'
        }
        if(botnum > 21){
            return 'Dealer went over 21, you won'
        }
        if(usernum > botnum){
            return 'You won'
        }
        if(usernum < botnum){
            return 'You lost'
        }
    }
    if(interaction.commandName === 'blackjack'){
        const embed =  new EmbedBuilder()
            .setTitle('Blackjack')
            .setDescription('You and the dealer will each draw 2 cards and who ever gets closest to but not passing 21 will win')
            .setColor('Random')
            .addFields(
                {   
                name: `Results:
You drew: ${usernum} dealer drew: ${botnum}`, 
                value: `${winnerbj(usernum,botnum)}`
                }
                )
        interaction.reply({ embeds: [embed]});
    };
    //slots
    const num = [":orangutan:",":nerd:",":skull:"  ];
    const randomslots1 = Math.floor(Math.random()*num.length)
    const randomslots2 = Math.floor(Math.random()*num.length)
    const randomslots3 = Math.floor(Math.random()*num.length)
    const num1 = num[randomslots1];
    const num2 = num[randomslots2];
    const num3 = num[randomslots3];
    const winnerslots = (num1,num2,num3) => {
        if (num1 == num2&&num1 == num3){
            return 'You won';
        }
        else{
            return 'Better luck next time';
        }
    }
    if (interaction.commandName === 'slots'){
        const embed =  new EmbedBuilder()
            .setTitle('Slots')
            .setDescription('Roll a slot and if you get three of the same emoji, you win!')
            .setColor('Random')
            .addFields(
                {   
                name: `Results:
${num1} ${num2} ${num3} `, 
                value: `${winnerslots(num1,num2,num3)}`,
                }
                )
        interaction.reply({ embeds: [embed]});
    }

    //coinflip
    const flip = ['Head','Tail'];
    const randomcf = Math.floor(Math.random()*flip.length)
    const botcf = flip[randomcf];
    const winnercf = (user_inputcf, botcf) => {
        if (user_inputcf === botcf){
            return "You won"
        }
        else{
            return "You lost"
        }
    };
    if (interaction.commandName === 'coinflip'){
        const user_inputcf = interaction.options.get('user-input')?.value;
        const embed =  new EmbedBuilder()
            .setTitle('Coin Flip')
            .setDescription('Choose between head and tail and if it lands on what you choose, you win!')
            .setColor('Random')
            .addFields(
                {   
                name: `Your choice: ${user_inputcf} 
Result: ${botcf}`, 
                value: `${winnercf(user_inputcf,botcf)}`
                }
                )
        interaction.reply({ embeds: [embed]});
    };
    const randommoney = Math.floor(Math.random()*1000);
    if(interaction.commandName === 'money'){
        const embed = new EmbedBuilder()
            .setTitle('Random Money Generator')
            .setDescription('Randomly gives you money between $1 and $1000')
            .setColor('Random')
            .addFields(
                {name: 'You got: ',
                 value: `$${randommoney}`
            }
            );
        interaction.reply({ embeds: [embed]});
    };
    
})
