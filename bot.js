var pr0 = require('./pr0.js');

const Discord = require('discord.js');
var client = new Discord.Client();
const config= require('./config.json');

client.on('ready',() => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  client.user.setActivity('Browsing /top/');
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
})

client.on("guildDelete", guild => {
  console.log(`Deleted from guild: ${guild.name} (id: ${guild.id}).`);
})

client.on('message', async message => {
  // Ignore bot messages
  if (message.author.bot) return;
  if (!message.content.startsWith("http")) return;
  if (!message.content.match(/\bpr0gramm.com\/new/)) return;

  // Do magic things
  var id = pr0.cutId(message.content);
  var post = pr0.postObject(id);

  // Check if post is nsfw or nsfl to deactivate image preview
  // nsfl
  if (post.flags == 2 || post.flags == 3) {
    message.channel.send("<https://img.pr0gramm.com/" + post.image + ">");
    message.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: post.author
        },
        title: post.id,
        url: message.content,
        fields: [
          {
            name: "Benis (+/-)",
            value: post.up + post.down + ' (' + post.up + " / " + post.down + ')'
          },
/*          {
            name: "top tags",
            value: post.tags.first+ " " + post.tags.second + " " + post.tags.thrid
          }*/
        ],
        footer: {
          color: 00000,
          text: "Hochgeladen von " + post.user
        }
      },
    })
  // nswf
  } else if (post.image.match(/\w\w\d+$/)) {
    message.channel.send("<https://img.pr0gramm.com/" + post.image+ ">");
    message.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: post.author
        },
        title: post.id,
        url: message.content,
        fields: [
          {
            name: "Benis (+/-)",
            value: post.up + post.down + ' (' + post.up + " / " + post.down + ')'
          },
/*          {
            name: "top tags",
            value: post.tags.first+ " " + post.tags.second + " " + post.tags.thrid
          } */
        ],
        footer: {
          color: 00000,
          text: "Hochgeladen von " + post.user
        }
      },
    })
  // sfw
  } else {

    message.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: post.author
        },
        title: post.id,
        url: message.content,
        fields: [
          {
            name: "Benis (+/-)",
            value: post.up + post.down + ' (' + post.up + " / " + post.down + ')'
          },
/*          {
            name: "top tags",
            value: post.tags.first+ " " + post.tags.second + " " + post.tags.thrid
          }*/
        ],
        footer: {
          color: 00000,
          text: "Hochgeladen von " + post.user
        }
      },
      files: [
        "https://img.pr0gramm.com/" + post.image
      ]
    })
  }
});

client.login(config.token);
