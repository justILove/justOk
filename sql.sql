SELECT 
proxy.busy as proxy_busy,
bots.* 
FROM `bots` 
LEFT JOIN proxy_bots as pb
  ON pb.bot = bots.id
LEFT JOIN proxy 
  ON pb.proxy = proxy.id
WHERE
  pb.proxy = 2
AND bots.type != "lost_access"


SELECT 
	b.id,
	(SELECT count(id) FROM group_ta_gone as gtg WHERE gtg.bot = b.id and gtg.status = "invited") as invited,
	b.friends,
	fp.friends_invited,
	TIMESTAMPDIFF(DAY, b.created_at, UTC_TIMESTAMP()) as live_days,
	b.type,
	fp.music_count
	
FROM bots as b
LEFT JOIN fill_profile as fp
	ON fp.bot = b.id
WHERE
	b.type = "lost_access"
ORDER BY invited DESC