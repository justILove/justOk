function OkBot_myPost()
{
	var _this = this;

	_this.debugLog = true;
	
	_this.r = '';
	_this.args   = null;
	
	_this.repeatedCount = 10;
	
	_this.run = function()
	{
		app.post.r = '';
		
		_this.args = _arguments();
		
		_do(function()
		{
			VAR_CYCLE_REPEAT_INDEX = _iterator() - 1
			BREAK_CONDITION = !app.post.r && VAR_CYCLE_REPEAT_INDEX < app.post.repeatedCount;
			
			if(!BREAK_CONDITION)
				_break();
			
			_call(function()
			{
				_on_fail(function(){
					VAR_LAST_ERROR = _result()
					VAR_WAS_ERROR = true
					
					sleep(5000)/*async!*/
					_break()
				})
				
				VAR_WAS_ERROR = false
				_call(app.post.sendPost, null)/*async!*/
			},null)/*async!*/
		})/*async!*/


	}

	
	
	_this.sendPost = function()
	{
		

		if (!app.post.args)
			app.post.args = _arguments();

		http_client_post_no_redirect(app.settings.domain + app.post.args.url, app.post.args.params, {"content-type":("urlencode"), "encoding":("UTF-8"), "method":("POST")})/*async!*/

		app.post.r = http_client_content();


		function isJson(str)
		{
			try {
				JSON.parse(str);
			} catch (e) {
				return false;
			}
			return true;
		}

		/**
		 * Ответ сразу парсим в пригодный для js'a вид, если json значит парсим
		 */
		if (isJson(app.post.r))
			app.post.r = JSON.parse(app.post.r);
		
		if (app.post.debugLog) 
			app.jlog(app.post.r, app.post.args.url)
	}
};