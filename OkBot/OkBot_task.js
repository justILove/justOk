/**
 * Класс по работе с задачами для бота
 * @param settings object
 */
function OkBot_Task (taskData)
{

	this.id         = taskData.id;
	this.name       = taskData.name;
	this.type       = taskData.type;
	this.options    = taskData.options;
	this.ta         = taskData.ta;

	this.status     = taskData.status;



	this.saveUniqTa = function()
	{

	}

	this.saveGoneActionOnTa = function()
	{
		var args = _arguments();

		_call(app.post.run,
		{
			url: app.settings.domain + 'tasks/goneActionOnTa',
			params:
			{
				id: this.ta.id,
				user: args.user
			}
		})/*async!*/;

	}

	this.checkGoneActionOnTa = function()
	{
		var args = _arguments();

		//log(args.user);

		_call(app.post.run,
		{
			url: app.settings.domain + 'tasks/checkIsGoneOnTa',
			params:
			{
				id: app.currentTask.ta.id,
				user: args.user
			}
		})/*async!*/;

	}

	this.activeTask = function()
	{
		app.currentTask = this;



		this.status = 'progress';
	}


	this.timeInit = function()
	{
		this.startDateTime   = new Date();
		this.currentDateTime = new Date();
	}

	
	this.durationTime = function()
	{
		// в секундах
		return parseInt((this.currentDateTime - this.startDateTime) / 1000);
	}


	this.complete = function ()
	{
		app.currentTask.status = 'complete';
	}

	this.checkUniqTaByPart = function()
	{
	    _call(app.post.run,
	    {
	    	url: app.settings.domain + 'tasks/checkUniqTaByPartUsers',
	    	params:
			{
				id: app.currentTask.ta.id,
				users: app.currentTask.ta.findedPart
			}
	    })/*async!*/;
	}

	this.changeTargetAudience = function()
	{
		_call(app.post.run,
		{
			url: app.settings.domain + 'tasks/getAnotherTA',
			params:
			{
				group_ta: app.currentTask.ta.group,
				ta_id: app.currentTask.ta.id
			}
		})/*async!*/;

		var response = app.post.result;

		app.currentTask.ta = response.result;

		app.currentTask.ta.uniq       = [];
		app.currentTask.ta.findedPart = [];
	}

	this.changeTA = function()
	{
		var response = app.post.result;

		app.currentTask.ta = response.result;

		app.jlog(app.currentTask.ta);
	}


	this.endAction = function()
	{
		app.currentTask.options.currentActionsComplete = app.currentTask.options.currentActionsComplete + 1;
		app.currentTask.options.current 				= app.currentTask.options.current + 1;

		if (app.currentTask.options.current >= app.currentTask.options.total)
			app.currentTask.complete();

		/**
		 * Update Task info
		 */
		_call(app.post.run,
		{
			url: app.settings.domain + 'model/findAndUpdate',
			params:
			{
				attributes: JSON.stringify(
					{
						id: app.currentTask.id,
						status: app.currentTask.status,
						options: app.currentTask.options
					}),
				model: 'BotTasks'
			}
		})/*async!*/;
	}
	
	this.loadPost = function()
	{
	    _call(app.post.run,
	    {
	    	url: app.settings.domain + 'tasks/getVkPost',
	    	params:
			{
				bot:     app.bot.id
			}
	    })/*async!*/;


		app.currentTask.post = JSON.parse(app.post.result.result);
	}

	this.savePostStatus = function()
	{
		_call(app.post.run,
		{
			url: app.settings.domain + 'model/findAndUpdate',
			params:
			{
				attributes: JSON.stringify(
					{
						id: app.currentTask.post.id,
						status: 'complete'
					}),
				model: 'Posts'
			}
		})/*async!*/;


	}

}