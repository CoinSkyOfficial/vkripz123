
const Promise = require('bluebird'); Promise.config({ cancellation: true });
const TelegramBot = require('node-telegram-bot-api'); 
 const token = '1533422106:AAGUE-tU3lQ7j3Q6k_qe1kTsh_GJIPhaMRU'; 
const bot = new TelegramBot(token, {polling: true});


const fetch = require('node-fetch'); 
const admin = 956720952;
const botname = "CryptoGrpBot" ;
const groupname = "CryptoGrpUpdate"

bot.onText(/\📆 Change Log/,(msg) => {
var d = new Date();
				bot.sendMessage(msg.chat.id , "_🗃️ Changelog of @"+botname+"\n\n🗒️ Server : "+d.toLocaleDateString("en-GB")+" | "+d.toLocaleTimeString()+"\n\n▪️Nothing new_" , {parse_mode:"markdown"});
});

bot.onText(/\📌 Help/,(msg) => {
				bot.sendMessage(msg.chat.id , "_/p - /p coin OR /p coin1 coin2 { Get price of a coin }\n\n/mp - /mp coin1 coin2 coin3 ... coinUnlimited { Get multiple coins price }\n\n/get - /get coin DD-MM-YYYY { Get price of a coin on a fixed date }\n\n/sh - /sh Link { Short a long url }\n\n/exchanges - /exchanges Rank { Rank is the number from 1 to 100 }\n\n/convert - /convert amount coin1 coin2 { Convert a coin to another }\n\n/logo - /logo coin { Get logo of a coin }\n\n/trending - Top 7 Trending Coins { Get trending coins (24H) }\n\n/qr - /qr data { Create a qr code }_" , {parse_mode:"markdown"});
});

bot.onText(/\/start/ , (msg)=> {
if(msg.chat.type == "private"){
bot.sendMessage(msg.chat.id , "*♻️ Helo "+msg.chat.first_name+" ♻️*" , { parse_mode:"markdown" , reply_markup:{resize_keyboard:true, keyboard:[["📆 Change Log" , "📌 Help"],["💶 Buy This Bot"]]}});

bot.sendMessage(admin,"<b>🔆 New user [ ✖️ ]\n\n⚜️ User : <a href='tg://user?id=" + msg.from.id + "'>" + msg.from.first_name + "</a>\n💳 ID :</b> <pre>" + msg.from.id + "</pre>" , { parse_mode:"HTML" });
				}else{ bot.sendMessage(msg.chat.id , "[Write me private](https://t.me/"+botname+")" , {parse_mode:"markdown"});
				}
});

bot.onText(/\💶 Buy This Bot/ , (msg) => {
				bot.sendMessage(msg.chat.id , "*⌚ Are your sure ?*" , {parse_mode:"markdown" , reply_markup:{inline_keyboard:[[{text:"✅ Yes , 100% Sure" , callback_data:"support2"}]]}});
});



bot.onText(/\/p/,(msg)=>{
var fs = msg.text.split(" ").slice(-1).join(" ");
if(msg.text == "/p "+fs){
bot.sendChatAction(msg.chat.id , "typing")
var sn = require('short-number');
var coins = fs.toLowerCase();
 var url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&symbols="+coins+"";
  var settings = { method: "Get" }; 
 fetch(url, settings) .then(res => res.json()) .then((json) =>
 				{ 
 		bot.sendMessage(msg.chat.id , "*"+json[0].symbol.toUpperCase()+" | $"+json[0].current_price+"*\n\n`#️⃣ RANK     : #"+json[0].market_cap_rank+"\n💲 PRICE    : $"+json[0].current_price+"\n🚀 ATH      : $"+json[0].ath+"\n📅 ATH DATE : "+json[0].ath_date.slice(0,10)+"\n\n🟢 HIGH (24H) = $"+json[0].high_24h+"\n🔴 LOW  (24H) = $"+json[0].low_24h+"\n\n♻️ CHANGE (24H) : "+json[0].price_change_percentage_24h+"%\n💁‍♂️ MARKET CAP   : $"+sn(json[0].market_cap)+"\n⏳ VOLUME (24H) : $"+sn(json[0].total_volume)+"\n🎓 CIRCULATING  : "+sn(json[0].circulating_supply)+" "+json[0].symbol.toUpperCase()+"`" , { parse_mode:"markdown" , reply_markup:{inline_keyboard:[[{text:"♻️ Refresh ♻️" , callback_data:"ref "+json[0].symbol+""}]]}});
 		

 				}).catch(error => { bot.sendMessage(msg.chat.id , "*❌ "+coins.toUpperCase()+" : Not found !*" , {reply_to_message_id:msg.message_id , parse_mode:"markdown"}); });
 				
 }});

bot.onText(/\/p/,(msg)=>{
var se = msg.text.split(" ").slice(-1).join(" ");
var c = msg.text.split(" ").slice(0, -1).join(" ");
var fs = c.split(" ").slice(-1).join(" ");
if(msg.text == "/p "+fs+" "+se){
bot.sendChatAction(msg.chat.id , "typing")
var sn = require('short-number');
var fst = fs.toLowerCase();
var sec = se.toLowerCase();
 var url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency="+sec+"&symbols="+fst+"";
  var settings = { method: "Get" }; 
 fetch(url, settings) .then(res => res.json()) .then((json) =>
 				{ 
 				var sh = sec.toUpperCase();
bot.sendMessage(msg.chat.id,"*"+json[0].symbol.toUpperCase()+" | "+json[0].current_price+" "+sh+"*\n\n`#️⃣ RANK     : #"+json[0].market_cap_rank+"\n💲 PRICE    : "+json[0].current_price+" "+sh+"\n🚀 ATH      : "+json[0].ath+" "+sh+"\n📅 ATH DATE : "+json[0].ath_date.slice(0,10)+"\n\n🟢 HIGH (24H) = "+json[0].high_24h+" "+sh+"\n🔴 LOW  (24H) = "+json[0].low_24h+" "+sh+"\n\n♻️ CHANGE (24H) : "+json[0].price_change_percentage_24h+"%\n💁‍♂️ MARKET CAP   : "+sn(json[0].market_cap)+" "+sh+"\n⏳ VOLUME (24H) : "+sn(json[0].total_volume)+" "+sh+"\n🎓 CIRCULATING  : "+sn(json[0].circulating_supply)+" "+json[0].symbol.toUpperCase()+"`" , {parse_mode:"markdown" , reply_markup:{inline_keyboard:[[{text:"♻️ Refresh ♻️" , callback_data:"con "+fst+" "+sec}]]}});


 				}).catch(error => { bot.sendMessage(msg.chat.id , "*❌ "+fst+" to "+sec+" : Not available !*" , {reply_to_message_id:msg.message_id , parse_mode:"markdown"}); });
 }});
 
 
bot.on("callback_query", function onCallbackQuery(callbackQuery) { const action = callbackQuery.data; const msg = callbackQuery.message;  const opts = { chat_id: msg.chat.id, message_id: msg.message_id, }; 	var coin = action.split(" ").slice(-1).join(" "); var date = new Date(); var d = date.toLocaleDateString(); var t = date.toLocaleTimeString();
				var sd = action.split(" ").slice(-1).join(" ");
var cd = action.split(" ").slice(0, -1).join(" ");
var ft = cd.split(" ").slice(-1).join(" "); 
var ids = action.split(" ").slice(-1).join(" ");
				if(action == "ref "+coin+"" ){
								var sn = require('short-number');
 var url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&symbols="+coin+"";
  var settings = { method: "Get" }; 
 fetch(url, settings) .then(res => res.json()) .then((json) =>
 				{  
bot.editMessageText("*"+json[0].symbol.toUpperCase()+" | $"+json[0].current_price+"*\n\n`#️⃣ RANK     : #"+json[0].market_cap_rank+"\n💲 PRICE    : $"+json[0].current_price+"\n🚀 ATH      : $"+json[0].ath+"\n📅 ATH DATE : "+json[0].ath_date.slice(0,10)+"\n\n🟢 HIGH (24H) = $"+json[0].high_24h+"\n🔴 LOW  (24H) = $"+json[0].low_24h+"\n\n♻️ CHANGE (24H) : "+json[0].price_change_percentage_24h+"%\n💁‍♂️ MARKET CAP   : $"+sn(json[0].market_cap)+"\n⏳ VOLUME (24H) : $"+sn(json[0].total_volume)+"\n🎓 CIRCULATING  : "+sn(json[0].circulating_supply)+" "+json[0].symbol.toUpperCase()+"`" , {chat_id:msg.chat.id , message_id:msg.message_id , parse_mode:"markdown" , reply_markup:{inline_keyboard:[[{text:"♻️ Refresh ♻️" , callback_data:"ref "+json[0].symbol+""}],[{text:"⏳ UPDATED : [ "+t+" ]" , callback_data:"0"}]]}});

 				}).catch(error => { bot.sendMessage(msg.chat.id , "*❌ "+coins.toUpperCase()+" : Not found !*" , {parse_mode:"markdown"});
 				});
				}
				if(action == "con "+ft+" "+sd){
						
var sn = require('short-number');
var fst = ft.toLowerCase();
var sec = sd.toLowerCase();
 var url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency="+sec+"&symbols="+fst+"";
  var settings = { method: "Get" }; 
 fetch(url, settings) .then(res => res.json()) .then((json) =>
 				{ 
 				var sh = sec.toUpperCase();
bot.editMessageText("*"+json[0].symbol.toUpperCase()+" | "+json[0].current_price+" "+sh+"*\n\n`#️⃣ RANK     : #"+json[0].market_cap_rank+"\n💲 PRICE    : "+json[0].current_price+" "+sh+"\n🚀 ATH      : "+json[0].ath+" "+sh+"\n📅 ATH DATE : "+json[0].ath_date.slice(0,10)+"\n\n🟢 HIGH (24H) = "+json[0].high_24h+" "+sh+"\n🔴 LOW  (24H) = "+json[0].low_24h+" "+sh+"\n\n♻️ CHANGE (24H) : "+json[0].price_change_percentage_24h+"%\n💁‍♂️ MARKET CAP   : "+sn(json[0].market_cap)+" "+sh+"\n⏳ VOLUME (24H) : "+sn(json[0].total_volume)+" "+sh+"\n🎓 CIRCULATING  : "+sn(json[0].circulating_supply)+" "+json[0].symbol.toUpperCase()+"`" , {chat_id:msg.chat.id , message_id:msg.message_id , parse_mode:"markdown" , reply_markup:{inline_keyboard:[[{text:"♻️ Refresh ♻️" , callback_data:"con "+fst+" "+sec}] , [{text:"⏳ UPDATED : [ "+t+" ]" , callback_data:"0"}]]}});

 				}).catch(error => { bot.sendMessage(msg.chat.id , "*❌ "+fst+" to "+sec+" : Not available !*" , {parse_mode:"markdown"}); });
				}
				if(action == "support2"){
bot.deleteMessage(msg.chat.id,msg.message_id)			        
			        bot.sendMessage(msg.chat.id, "*🎓 Bot : @"+botname+"\n\n💵 Price 100 TRX\n💹 Nodejs Bot\n\n🗞️ Send TRX to :* `TAzLgS9SVfr9aXLjQ3zPrVeWKmJGLb1qUu`\n\n*Send transaction link here after confirmed*" , { parse_mode:"markdown"}).then(function (a) { answerCallbacks[msg.chat.id] = function (answer) { var name = answer.text;  if ( name == "/start"){ return; } 
			        				
			        				if(name == "📆 Change Log"){ return; }
			        				if(name == "📌 Help"){ return; }
			        				if(name == "💶 Buy This Bot"){ return; }
bot.deleteMessage(msg.chat.id,a.message_id)
bot.deleteMessage(msg.chat.id,answer.message_id)
bot.sendMessage(msg.chat.id, "*Sent :* `" + name + "`" , {parse_mode:"markdown"});
			
bot.sendMessage(admin, "*💹 Name :* [" + msg.chat.first_name + "](tg://user?id=" + msg.chat.id + ")\n\n*🔱 User ID :* `" + msg.chat.id + "`\n\n*📥 Transaction :* `" + name + "`" , {parse_mode:"markdown" , reply_markup:{inline_keyboard:[[{text:"Reply to " + msg.chat.first_name + "" , callback_data:"reply " + msg.chat.id + ""}]]}});} });
				}
				if(action == "reply " + ids + ""){
								if ( msg.chat.id == admin) { 
bot.deleteMessage(msg.chat.id,msg.message_id);
bot.sendMessage(msg.chat.id, "*💌 Enter Message for Reply*" , {parse_mode:"markdown"}).then(function (f) { answerCallbacks[msg.chat.id] = function (answer) { var ans = answer.text;
bot.deleteMessage(msg.chat.id,f.message_id)
bot.deleteMessage(msg.chat.id,answer.message_id)
 bot.sendMessage(msg.chat.id, "*✅ Replied to* `" + ids + "` *as* `" + ans + "` *Success*" , {parse_mode:"markdown"});
				 		
bot.sendMessage(ids, "`💹 New Message From Admin\n\n🔱 Message :` `" + ans + "`" , {parse_mode:"markdown"});} }); }
				}
				});
				
bot.on("polling_error", (msg) => {
				console.log(msg)
				});

bot.onText(/\/convert/,(msg)=>{
var Hi = msg.text;
var t = Hi.split(" ").slice(-1).join(" ");
var c = Hi.split(" ").slice(0,-1).join(" ");
var s = c.split(" ").slice(-1).join(" ");
var r = c.split(" ").slice(0 ,-1).join(" ");
var f = r.split(" ").slice(-1).join(" ");
if(msg.text == "/convert "+f+" "+s+" "+t){
if(isNaN(f)){ bot.sendMessage(msg.chat.id , "_❌ Enter amount in digit_" , {reply_to_message_id:msg.message_id , parse_mode:"markdown"}); return; }
bot.sendChatAction(msg.chat.id , "typing")
var sn = require('short-number');
var sec = s.toLowerCase();
var th = t.toLowerCase();
 var url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency="+th+"&symbols="+sec+"";
  var settings = { method: "Get" }; 
 fetch(url, settings) .then(res => res.json()) .then((json) =>
 				{ 
bot.sendMessage(msg.chat.id,"*"+f+" "+sec.toUpperCase()+" = "+((json[0].current_price)*f)+" "+th.toUpperCase()+"*" , {reply_to_message_id:msg.message_id , parse_mode:"markdown"});


 				}).catch(error => { bot.sendMessage(msg.chat.id , "*❌ Convert Not found !*" , {parse_mode:"markdown"}); });
 }});

bot.onText(/\/logo/,(msg)=>{
var fs = msg.text.split(" ").slice(-1).join(" ");
if(msg.text == "/logo "+fs){
bot.sendChatAction(msg.chat.id , "typing")
var coins = fs.toLowerCase();
 var url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&symbols="+coins+"";
  var settings = { method: "Get" }; 
 fetch(url, settings) .then(res => res.json()) .then((json) =>
 				{ 
 		bot.sendPhoto(msg.chat.id , ""+json[0].image+"" , { caption : "`✅ "+coins.toUpperCase()+" LOGO`" , parse_mode:"markdown"});
 		

 				}).catch(error => { bot.sendMessage(msg.chat.id , "*❌ "+coins.toUpperCase()+" : Not found !*" , {reply_to_message_id:msg.message_id , parse_mode:"markdown"}); });
 }});

bot.onText(/\/trending/,(msg)=>{
bot.sendChatAction(msg.chat.id , "typing")
 var url = "https://api.coingecko.com/api/v3/search/trending";
  var settings = { method: "Get" }; 
 fetch(url, settings) .then(res => res.json()) .then((json) =>
 				{ 
 bot.sendPhoto(msg.chat.id , ""+json.coins[0].item.large+"" , { caption : "*🔥 Trending coins (Top-7) on CoinGecko in the last 24 hours\n\n#trending1\n♻️ Name : "+json.coins[0].item.name+"\n⚜️ ID : "+json.coins[0].item.id+"\n🔰 Symbol : "+json.coins[0].item.symbol+"\n\n💲 RANK : #"+json.coins[0].item.market_cap_rank+"\n\n#trending2\n♻️ Name : "+json.coins[1].item.name+"\n⚜️ ID : "+json.coins[1].item.id+"\n🔰 Symbol : "+json.coins[1].item.symbol+"\n\n💲 RANK : #"+json.coins[1].item.market_cap_rank+"\n\n#trending3\n♻️ Name : "+json.coins[2].item.name+"\n⚜️ ID : "+json.coins[2].item.id+"\n🔰 Symbol : "+json.coins[2].item.symbol+"\n\n💲 RANK : #"+json.coins[2].item.market_cap_rank+"\n\n#trending4\n♻️ Name : "+json.coins[3].item.name+"\n⚜️ ID : "+json.coins[3].item.id+"\n🔰 Symbol : "+json.coins[3].item.symbol+"\n\n💲 RANK : #"+json.coins[3].item.market_cap_rank+"\n\n#trending5\n♻️ Name : "+json.coins[4].item.name+"\n⚜️ ID : "+json.coins[4].item.id+"\n🔰 Symbol : "+json.coins[4].item.symbol+"\n\n💲 RANK : #"+json.coins[4].item.market_cap_rank+"\n\n#trending6\n♻️ Name : "+json.coins[5].item.name+"\n⚜️ ID : "+json.coins[5].item.id+"\n🔰 Symbol : "+json.coins[5].item.symbol+"\n\n💲 RANK : #"+json.coins[5].item.market_cap_rank+"\n\n#trending7\n♻️ Name : "+json.coins[6].item.name+"\n⚜️ ID : "+json.coins[6].item.id+"\n🔰 Symbol : "+json.coins[6].item.symbol+"\n\n💲 RANK : #"+json.coins[6].item.market_cap_rank+"*" , parse_mode:"markdown"});
 
 				});
 });
 
bot.onText(/\/mp/,(msg)=>{
var Hi = msg.text.split(" ").join(",")
var k = Hi.substring(4);
var i;

if(Hi == "/mp,"+k){
var sn = require('short-number');
var count = k.split(",").length-1 ;
bot.sendChatAction(msg.chat.id , "typing")
var t = k.toLowerCase();
 var url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&symbols="+t+"";
  var settings = { method: "Get" }; 
 fetch(url, settings) .then(res => res.json()) .then((json) =>
 				{ 
 				var text = "1. "+json[0].symbol.toUpperCase()+" ( #"+json[0].market_cap_rank+" )\n\n💶 1 "+json[0].symbol.toUpperCase()+" = $"+json[0].current_price+"\n🟢 HIGH (24H) = $"+json[0].high_24h+"\n🔴 LOW (24H) = $"+json[0].low_24h+"\n♻️ CHANGE (24H) = "+json[0].price_change_percentage_24h+"%\n⏳ VOLUME (24H) = $"+sn(json[0].total_volume)+"\n➖➖➖➖➖➖➖➖➖➖\n\n"
 	for(i=1; i<=count; i++){
 
 					var text = text + ""+(i-(-1))+". "+json[i].symbol.toUpperCase()+" ( #"+json[i].market_cap_rank+" )\n\n💶 1 "+json[i].symbol.toUpperCase()+" = $"+json[i].current_price+"\n🟢 HIGH (24H) = $"+json[i].high_24h+"\n🔴 LOW (24H) = $"+json[i].low_24h+"\n♻️ CHANGE (24H) = "+json[i].price_change_percentage_24h+"%\n⏳ VOLUME (24H) = $"+sn(json[i].total_volume)+"\n➖➖➖➖➖➖➖➖➖➖\n\n"
 	
 			}	
 			bot.sendMessage(msg.chat.id , "*"+text+"*" , {parse_mode:"markdown"});
 			
 			}).catch(error => { bot.sendMessage(msg.chat.id , "*❌ One of the entered coins are not found !*" , {reply_to_message_id:msg.message_id , parse_mode:"markdown"});
 			});
} });


bot.onText(/\/exchanges/,(msg)=>{
var Hi = msg.text;
var t = Hi.split(" ").slice(-1).join(" ");

if(msg.text == "/exchanges "+t){
if(isNaN(t)){ bot.sendMessage(msg.chat.id , "_❌ Enter amount in digit_" , {reply_to_message_id:msg.message_id , parse_mode:"markdown"}); return; }
var sn = require('short-number');
bot.sendChatAction(msg.chat.id , "typing")
 var url = "https://api.coingecko.com/api/v3/exchanges";
  var settings = { method: "Get" }; 
 fetch(url, settings) .then(res => res.json()) .then((json) =>
 				{ 
 
 			bot.sendPhoto(msg.chat.id , ""+json[t-1].image+"" , { caption : "*👁️‍🗨️ Trust Rank : #"+json[t-1].trust_score_rank+"\n\n🖲️ Exchange Name : "+json[t-1].name+"\n🖥️ Established year : "+json[t-1].year_established+"\n🌍 Country : "+json[t-1].country+"\n🔐 Trust Score : "+json[t-1].trust_score+"\n\n📉 Trade Volume : "+sn(json[t-1].trade_volume_24h_btc)+" BTC\n*" , parse_mode:"markdown" , reply_markup:{inline_keyboard:[[{text:""+json[t-1].name+"" , url:""+json[t-1].url+""}]]}});
 			
 			}).catch(error => { bot.sendMessage(msg.chat.id , "*❌ Enter Trust value from 1 to 100*" , {reply_to_message_id:msg.message_id , parse_mode:"markdown"});
 			});
} });

bot.onText(/\/sh/,(msg)=>{
var link = msg.text.substring(4);
if(msg.text == "/sh "+link){
bot.sendChatAction(msg.chat.id , "typing");
var TinyURL = require('tinyurl'); 

    TinyURL.shorten(""+link+"", function(res) 
    				{ 
    				if( res == "Error"){
    								bot.sendMessage(msg.chat.id , "_🖇️ Invalid Link_" , {parse_mode:"markdown"});
    								return;
    				}
    				bot.sendMessage(msg.chat.id , "_🖇️ Link : "+link+"\n\n👁️‍🗨️ Short Link : "+res+"_" , {parse_mode:"markdown" , disable_web_page_preview:true });

 				});
 }});
 
bot.onText(/\/get/,(msg)=>{
var se = msg.text.split(" ").slice(-1).join(" ");
var c = msg.text.split(" ").slice(0, -1).join(" ");
var fs = c.split(" ").slice(-1).join(" ");

if(msg.text == "/get "+fs+" "+se){
bot.sendChatAction(msg.chat.id , "typing")
var sn = require('short-number');
var coins = fs.toLowerCase();
 var url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&symbols="+coins+"";
  var settings = { method: "Get" }; 
 fetch(url, settings) .then(re => re.json()) .then((jso) =>
 				{ 
 				var urll = "https://api.coingecko.com/api/v3/coins/"+jso[0].id+"/history?date="+se+"";
 				
  var settings = { method: "Get" }; 
 fetch(urll, settings) .then(res => res.json()) .then((json) =>
 				{ 
 		bot.sendPhoto(msg.chat.id , ""+jso[0].image+"" , { caption : "*📉 "+json.name.toUpperCase()+" on "+se+"\n\n👁️‍🗨️ Price USD : $"+(json.market_data.current_price.usd).toFixed(4)+"\n👁️‍🗨️ Price INR : ₹"+(json.market_data.current_price.inr).toFixed(4)+"\n\n🎓 Market Cap : $"+sn(json.market_data.market_cap.usd)+"\n🖲️ Total Volume : $"+sn(json.market_data.total_volume.usd)+"*" , parse_mode:"markdown"});
 		}).catch(error => { bot.sendMessage(msg.chat.id , "*❌ Invalid format*" , {reply_to_message_id:msg.message_id , parse_mode:"markdown"}); });
 		
 				}).catch(error => { bot.sendMessage(msg.chat.id , "*❌ Invalid format*" , {reply_to_message_id:msg.message_id , parse_mode:"markdown"}); });
 				
 }});



bot.onText(/\/qr/,(msg) => {
var mh = msg.text.substring(4);
if(msg.text == "/qr "+mh ){
bot.sendChatAction(msg.chat.id , "typing");
				var q = "https://chart.googleapis.com/chart?cht=qr&chs=500x500&chl="+mh+"&chld=H|0"
  bot.sendPhoto(msg.chat.id , q , { caption:"*👁️‍🗨️ QR CODE GENERATED :* `"+mh+"`" , parse_mode:"markdown"});
}
});

var answerCallbacks = {}; bot.on('message', function (msg) { var callback = answerCallbacks[msg.chat.id]; if (callback) { delete answerCallbacks[msg.chat.id]; return callback(msg); } });
