const faker = require('faker');

faker.locale = 'en';
/*
//Address
var zipCode = faker.address.zipCode();
var city = faker.address.city();
// var cityPrefix = faker.address.cityPrefix();
// var citySuffix = faker.address.citySuffix();
// var streetName = faker.address.streetName();
var streetAddress = faker.address.streetAddress();
// var streetSuffix = faker.address.streetSuffix();
// var streetPrefix = faker.address.streetPrefix();
var secondaryAddress = faker.address.secondaryAddress();
var county = faker.address.county();
var country = faker.address.country();
var countryCode = faker.address.countryCode();
// var state = faker.address.state();
// var stateAbbr = faker.address.stateAbbr();
// var latitude = faker.address.latitude();
// var longitude = faker.address.longitude();

console.log(`Address zipCode = ${zipCode}`);
console.log(`Address city = ${city}`);
// console.log(`Address cityPrefix = ${cityPrefix}`);
// console.log(`Address citySuffix = ${citySuffix}`);
// console.log(`Address streetName = ${streetName}`);
console.log(`Address streetAddress = ${streetAddress}`);
// console.log(`Address streetSuffix = ${streetSuffix}`);
// console.log(`Address streetPrefix = ${streetPrefix}`);
console.log(`Address secondaryAddress = ${secondaryAddress}`);
console.log(`Address county = ${county}`);
console.log(`Address country = ${country}`);
console.log(`Address countryCode = ${countryCode}`);
// console.log(`Address state = ${state}`);
// console.log(`Address stateAbbr = ${stateAbbr}`);
// console.log(`Address latitude = ${latitude}`);
// console.log(`Address longitude = ${longitude}`);
*/
/*
//Commerce
console.log(
  `-------------------------------------------------------------------------------------------`
);
var color = faker.commerce.color();
var department = faker.commerce.department();
var productName = faker.commerce.productName();
var price = faker.commerce.price(1, 100000, 2, '$');
// var productAdjective = faker.commerce.productAdjective();
var productMaterial = faker.commerce.productMaterial();
var product = faker.commerce.product();

console.log(`Commerce color = ${color}`);
console.log(`Commerce department = ${department}`);
console.log(`Commerce productName = ${productName}`);
console.log(`Commerce price = ${price}`);
// console.log(`Commerce productAdjective = ${productAdjective}`);
console.log(`Commerce productMaterial = ${productMaterial}`);
console.log(`Commerce product = ${product}`);
*/
/*
//Company
console.log(
  `-------------------------------------------------------------------------------------------`
);
// var suffixes = faker.company.suffixes();
var companyName = faker.company.companyName();
var companySuffix = faker.company.companySuffix();
var catchPhrase = faker.company.catchPhrase();
// var bs = faker.company.bs();
// var catchPhraseAdjective = faker.company.catchPhraseAdjective();
// var catchPhraseDescriptor = faker.company.catchPhraseDescriptor();
// var catchPhraseNoun = faker.company.catchPhraseNoun();
// var bsNoun = faker.company.bsNoun();
// var bsAdjective = faker.company.bsAdjective();
// var bsBuzz = faker.company.bsBuzz();

// console.log(`Company suffixes = ${suffixes}`);
console.log(`Company companyName = ${companyName}`);
console.log(`Company companySuffix = ${companySuffix}`);
console.log(`Company catchPhrase = ${catchPhrase}`);
// console.log(`Company bs = ${bs}`);
// console.log(`Company catchPhraseAdjective = ${catchPhraseAdjective}`);
// console.log(`Company catchPhraseDescriptor = ${catchPhraseDescriptor}`);
// console.log(`Company catchPhraseNoun = ${catchPhraseNoun}`);
// console.log(`Company bsAdjective = ${bsAdjective}`);
// console.log(`Company bsNoun = ${bsNoun}`);
// console.log(`Company bsBuzz = ${bsBuzz}`);
*/

/*
//Database
console.log(
  `-------------------------------------------------------------------------------------------`
);
// var column = faker.database.column();
// var type = faker.database.type();
// var collation = faker.database.collation();
// var engine = faker.database.engine();

// console.log(`Database column = ${column}`);
// console.log(`Database type = ${type}`);
// console.log(`Database collation = ${collation}`);
// console.log(`Database engine = ${engine}`);
*/
/*
//Date
console.log(
  `-------------------------------------------------------------------------------------------`
);
var past = faker.date.past();
var future = faker.date.future();
// var between = faker.date.between();
var recent = faker.date.recent();
var month = faker.date.month();
var weekday = faker.date.weekday();

console.log(Date.now());

console.log(`Date past = ${past}`);
console.log(`Date future = ${future}`);
// console.log(`Date between = ${between}`);
console.log(`Date recent = ${recent}`);
console.log(`Date month = ${month}`);
console.log(`Date weekday = ${weekday}`);
*/
/*
//Finance
console.log(
  `-------------------------------------------------------------------------------------------`
);
var account = faker.finance.account();
var accountName = faker.finance.accountName();
// var mask = faker.finance.mask();
// var amount = faker.finance.amount(1, 1000000, 2, '$');
var transactionType = faker.finance.transactionType();
var currencyCode = faker.finance.currencyCode();
var currencyName = faker.finance.currencyName();
var currencySymbol = faker.finance.currencySymbol();
var bitcoinAddress = faker.finance.bitcoinAddress();
var iban = faker.finance.iban();
var bic = faker.finance.bic();

console.log(`Finance account = ${account}`);
console.log(`Finance accountName = ${accountName}`);
// console.log(`Finance mask = ${mask}`);
// console.log(`Finance amount = ${amount}`);
console.log(`Finance transactionType = ${transactionType}`);
console.log(`Finance currencyCode = ${currencyCode}`);
console.log(`Finance currencyName = ${currencyName}`);
console.log(`Finance currencySymbol = ${currencySymbol}`);
console.log(`Finance bitcoinAddress = ${bitcoinAddress}`);
console.log(`Finance iban = ${iban}`);
console.log(`Finance bic = ${bic}`);
*/

/*
//Helpers
console.log(
  `-------------------------------------------------------------------------------------------`
);
var createCard = faker.helpers.createCard();
var contextualCard = faker.helpers.contextualCard();
var userCard = faker.helpers.userCard();
var createTransaction = faker.helpers.createTransaction();

console.log(createCard);
console.log(`Helpers createCard = ${createCard.toString()}`);
console.log(`Helpers contextualCard = ${contextualCard.toString()}`);
console.log(`Helpers userCard = ${userCard.toString()}`);
console.log(`Helpers createTransaction = ${createTransaction.toString()}`);
*/
/*
//Image
console.log(
  `-------------------------------------------------------------------------------------------`
);
var image = faker.image.image();
var avatar = faker.image.avatar();
var imageUrl = faker.image.imageUrl();
var abstract = faker.image.abstract();
var animals = faker.image.animals();
var business = faker.image.business();
var cats = faker.image.cats();
var city = faker.image.city();
var food = faker.image.food();
var nightlife = faker.image.nightlife();
var fashion = faker.image.fashion();
var people = faker.image.people();
var nature = faker.image.nature();
var sports = faker.image.sports();
var technics = faker.image.technics();
var transport = faker.image.transport();

console.log(`Image image = ${image}`);
console.log(`Image avatar = ${avatar}`);
console.log(`Image imageUrl = ${imageUrl}`);
console.log(`Image abstract = ${abstract}`);
console.log(`Image animals = ${animals}`);
console.log(`Image business = ${business}`);
console.log(`Image cats = ${cats}`);
console.log(`Image city = ${city}`);
console.log(`Image food = ${food}`);
console.log(`Image nightlife = ${nightlife}`);
console.log(`Image fashion = ${fashion}`);
console.log(`Image people = ${people}`);
console.log(`Image nature = ${nature}`);
console.log(`Image sports = ${sports}`);
console.log(`Image technics = ${technics}`);
console.log(`Image transport = ${transport}`);
*/
/*
//Internet
console.log(
  `-------------------------------------------------------------------------------------------`
);

var avatar = faker.internet.avatar();
var email = faker.internet.email();
var exampleEmail = faker.internet.exampleEmail();
var userName = faker.internet.userName();
var protocol = faker.internet.protocol();
var url = faker.internet.url();
var domainName = faker.internet.domainName();
// var domainSuffix = faker.internet.domainSuffix();
// var domainWord = faker.internet.domainWord();
var ip = faker.internet.ip();
var ipv6 = faker.internet.ipv6();
var userAgent = faker.internet.userAgent();
var color = faker.internet.color();
var mac = faker.internet.mac();
var password = faker.internet.password();

console.log(`Internet avatar = ${avatar}`);
console.log(`Internet email = ${email}`);
console.log(`Internet exampleEmail = ${exampleEmail}`);
console.log(`Internet userName = ${userName}`);
console.log(`Internet protocol = ${protocol}`);
console.log(`Internet url = ${url}`);
console.log(`Internet domainName = ${domainName}`);
// console.log(`Internet domainSuffix = ${domainSuffix}`);
// console.log(`Internet domainWord = ${domainWord}`);
console.log(`Internet ip = ${ip}`);
console.log(`Internet ipv6 = ${ipv6}`);
console.log(`Internet userAgent = ${userAgent}`);
//color hexadecimal
console.log(`Internet color = ${color}`);
console.log(`Internet mac = ${mac}`);
console.log(`Internet password = ${password}`);
*/
/*
//Lorem
console.log(
  `-------------------------------------------------------------------------------------------`
);

var word = faker.lorem.word();
var words = faker.lorem.words();
var sentence = faker.lorem.sentence();
var slug = faker.lorem.slug();
var sentences = faker.lorem.sentences();
var paragraph = faker.lorem.paragraph();
var paragraphs = faker.lorem.paragraphs();
var text = faker.lorem.text();
var lines = faker.lorem.lines();

console.log(`Lorem word = ${word}`);
console.log(`Lorem words = ${words}`);
console.log(`Lorem sentence = ${sentence}`);
console.log(`Lorem slug = ${slug}`);
console.log(`Lorem sentences = ${sentences}`);
console.log(`Lorem paragraph = ${paragraph}`);
console.log(`Lorem paragraphs = ${paragraphs}`);
console.log(`Lorem text = ${text}`);
console.log(`Lorem lines = ${lines}`);
*/
/*
//Name
console.log(
  `-------------------------------------------------------------------------------------------`
);
var findName = faker.name.findName();
var jobTitle = faker.name.jobTitle();
var title = faker.name.title();

console.log(`Name findName = ${findName}`);
console.log(`Name jobTitle = ${jobTitle}`);
console.log(`Name title = ${title}`);
*/
/*
//Phone
console.log(
  `-------------------------------------------------------------------------------------------`
);
var phoneNumber = faker.phone.phoneNumber();

console.log(`Phone phoneNumber = ${phoneNumber}`);
*/
/*
//Random
console.log(
  `-------------------------------------------------------------------------------------------`
);
var uuid = faker.random.uuid();
var boolean = faker.random.boolean();
var alphaNumeric = faker.random.alphaNumeric();

console.log(`Random uuid = ${uuid}`);
console.log(`Random boolean = ${boolean}`);
console.log(`Random alphaNumeric = ${alphaNumeric}`);
*/
/*
//System
console.log(
  `-------------------------------------------------------------------------------------------`
);
var fileName = faker.system.fileName();
var mimeType = faker.system.mimeType();
var semver = faker.system.semver();

console.log(`System fileName = ${fileName}`);
console.log(`System mimeType = ${mimeType}`);
console.log(`System semver = ${semver}`);
*/

for (var i = 1; i <= 100000; i++) {
  if (i == 1) console.log(i);
}
