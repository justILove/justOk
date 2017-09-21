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
	(
		SELECT count(id) FROM group_ta_gone as gtg WHERE gtg.bot = bots.id
	) as invited,
	bots.id
FROM bots
WHERE
	type = "lost_access"