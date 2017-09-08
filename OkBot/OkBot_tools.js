/**
 * Полезные функции для работы
 * @type {{forAll: app.tools.forAll, shuffle: app.tools.shuffle}}
 */
function OkBot_getTools()
{
    return {
        addDateHours: function(date, hours)
        {
            date.setHours(date.getHours() + hours);

            return date;
        },
		rand: function(min, max)
		{
			return Math.floor(Math.random()*(max-min+1)+min);
		},
		shuffle: function (a) 
		{
			var j, x, i;
			
			for (i = a.length; i; i--) 
			{
				j    = Math.floor(Math.random() * i);
				x    = a[i - 1];
				a[i - 1] = a[j];
				a[j] = x;
			}
		},
		forAll: function (arr, callback)
		{
			for (var i = 0; i < arr.length; i++)
			{
				callback(i);
			}
		},
		shuffle: function (array, condition)
		{
			var currentIndex = array.length,
				temporaryValue,
				randomIndex;

			condition = condition || function()
				{
					return true;
				}

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {

				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;


				// And swap it with the current element.
				temporaryValue = array[currentIndex];

				if (condition(temporaryValue, array[randomIndex]))
				{
					array[currentIndex] = array[randomIndex];
					array[randomIndex] = temporaryValue;
				}
			}

			return array;
		}
	}
}
