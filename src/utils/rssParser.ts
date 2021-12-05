import Parser from 'rss-parser';

const parser = new Parser();

export default async function parse(url: string) {
  const response = await parser.parseURL(url);

  return response;
}
