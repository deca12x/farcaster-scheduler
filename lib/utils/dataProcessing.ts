export function processData(data: any) {
  return data.casts
    .filter((cast: any) => cast.published) // Filter for published casts
    .map((cast: any) => {
      return {
        cast_text: cast.text,
        ipfs_url: cast.hash,
        datetime: cast.timestamp,
        fid: cast.author.fid,
        likes_count: cast.reactions.likes_count,
        recasts_count: cast.reactions.recasts_count,
        channel_name: cast.channel.name,
        author_display_name: cast.author.display_name,
        author_pfp_url: cast.author.pfp_url,
      };
    });
}
