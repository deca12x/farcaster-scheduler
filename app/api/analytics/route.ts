const request = require("request");

const options = {
  method: "GET",
  url: "https://api.neynar.com/v2/farcaster/feed?feed_type=filter&filter_type=fids&fids=410626&with_recasts=false&limit=100",
  headers: { accept: "application/json", api_key: "NEYNAR_API_DOCS" },
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
