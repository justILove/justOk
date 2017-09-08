/**
 * this = global scope
 */

/**
 * Базовый класс нашего приложения
 * @constructor
 */
function OkBot_App()
{
	/**
	 * this = App
	 */

	this.settings = 
	{
		domain: 'http://ok-bot.com/',
		ruCaptchaKey: '57b2674a68d5300fa41b6a974bf3ff04'
	}
	
	

	
	this.load = function()
	{
		app.loadArgs = _arguments();
		
		VAR_PAGE_LOADED = false
     
		_do(function()
		{
			VAR_CYCLE_INDEX = _iterator() - 1
			BREAK_CONDITION = !VAR_PAGE_LOADED && VAR_CYCLE_INDEX < 10;

			if(!BREAK_CONDITION)
				_break();

			_call(function()
			{
				_on_fail(function()
				{
					VAR_LAST_ERROR = _result()
					VAR_WAS_ERROR  = true
					_break()
				})
			 
				

				VAR_WAS_ERROR = false;
				
				// таймаут ожидания 120 сек
				general_timeout_next(120000)

				load(app.loadArgs.url)!

				VAR_PAGE_LOADED = true;

			},null)!

		  })!
  
		if (!VAR_PAGE_LOADED)
		{
			log(VAR_LAST_ERROR);
			fail("Page not loaded: " + app.loadArgs.url, false)
		}
   
	}

	
	/**
	 * Отобразить в Log object
	 * @param object
	 */
	this.jlog = function(str, msg)
	{
		if (msg)
			msg += ': ';
		else
			msg = '';
		
		log(msg + JSON.stringify(str));
	}	
}


