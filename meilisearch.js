import fetch from 'node-fetch';
import cheerio from 'cheerio';

import { MeiliSearch } from 'meilisearch';


const client = new MeiliSearch({
  host: 'https://search.whatsgreener.xyz',
  apiKey: process.argv.slice(2)[0],
});

const index = client.index('calculations');


function titleToId(title) {
  return title.toLowerCase().replace(/\W/g, "_");
}


const headings = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
];


const getCalculations = async () => {
  const documents = [];

  const response = await fetch('https://whatsgreener.xyz/calculations');
  const body = await response.text();

  const $ = cheerio.load(body, {
    normalizeWhitespace: false,
  });

  const content = $('div[slot=content]');

  content.children().each((i, el) => {

    const name = el.name;
    const text = $(el).text();
    const id = $(el).attr('id');

    const doclength = documents.length;
    const last_doc = documents[doclength - 1];

    let parent = 'Calculations';
    if (doclength > 1) {
      parent = last_doc.title;
    }


    if (headings.includes(name)) {
      documents.push({
        id: titleToId(text),
        parent: parent,
        title: text,
        content: '',
      })
    } else if (name !== 'pre') {
      if (last_doc) {
        last_doc.content += ' ' + text.trim();
      }
    }
  })

  for (const doc of documents) {
    doc.content = doc.content.trim().replace(/(\r\n|\n|\r)/gm, "").replace(/"/g, '').replace(/\s\s+/g, ' ');
  }

  console.log(documents)


  await index.updateDocuments(documents);
  await index.updateSettings({
    'searchableAttributes': [
      'title',
      'content',
    ]
  })

  // console.log(test)

  // const tasks = await index.getTasks();
  // console.log(tasks.results[0].error)

  const docs = await index.getDocuments();
  // console.log(docs)

  const test = await index.search('vegan')
  console.log(test)

  const keys = await client.getKeys();
  console.log(keys);
};

getCalculations();


