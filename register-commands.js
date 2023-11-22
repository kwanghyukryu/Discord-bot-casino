require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } =require('discord.js');


//type node src/register-commands.js to register the commands
const commands = [
    {
        name: 'money',
        description: 'Randomly gives you money between $1 and $1000'
    },
    {
        name: 'help',
        description: 'Everything you need to know about casino bot'
    },
    {
        name: 'rock-paper-scissor',
        description: 'game of rock paper scissor',
        options: [
            {
                name: 'user-input',
                description: 'Choose your option',
                type: ApplicationCommandOptionType.String,
                choices: [
                    {
                        name: 'Rock',
                        value: 'Rock',
                    },
                    {
                        name: 'Paper',
                        value: 'Paper',
                    },
                    {
                        name: 'Scissor',
                        value: 'Scissor',
                    }
                ],
                required: true,
            }
        ]
    },
    {
        name: 'blackjack',
        description: 'To win, the Blackjack players hand total must beat the botss hand without going over 21.',
    },
    {
        name: 'slots',
        description: 'Get the same number three times in a row to win'
    },
    {
        name: 'coinflip',
        description: 'choose between head or tail. If you guess correctly, you win',
        options:[
            {
                name: 'user-input',
                description: 'Choose your option',
                type: ApplicationCommandOptionType.String,
                choices:[
                    {
                        name: 'Head',
                        value: 'Head',
                    },
                    {
                        name: 'Tail',
                        value: 'Tail',
                    }
                ],
                required: true,
            }
        ]
    },
];

const rest = new REST({ version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try{
        console.log('Registering slash commands..')

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body: commands}
        )

        console.log('slash commands were registered succesfully')
    }catch (error) {
        console.log(`There was an error; ${error}`)
    }
})();
