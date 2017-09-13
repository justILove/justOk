SELECT
	(
		SELECT count(id) FROM group_ta_gone as gtg WHERE gtg.bot = bots.id
	) as invited,
	bots.id
FROM bots
WHERE
	type = "lost_access"