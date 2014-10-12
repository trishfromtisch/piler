require "active_record"
require_relative "../lib/comment.rb"
require_relative "../lib/neighborhood.rb"
require_relative "../lib/report.rb"
require_relative "../lib/user.rb"

ActiveRecord::Base.establish_connection({
	:adapter => "postgresql",
	:host => "localhost",
<<<<<<< HEAD
	:username => "grampus",
=======
	:username => "shotaro",
>>>>>>> 55103a1aafacbeb836f028ff18295b0b59e87674
	:database => "piler"
	})

ActiveRecord::Base.logger = Logger.new(STDOUT)