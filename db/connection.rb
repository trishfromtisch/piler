require "active_record"
require_relative "../lib/comment.rb"
require_relative "../lib/neighborhood.rb"
require_relative "../lib/report.rb"
require_relative "../lib/user.rb"

ActiveRecord::Base.establish_connection({
	:adapter => "postgresql",
	:host => "localhost",
<<<<<<< HEAD
	:username => "shotaro",
=======
	:username => "susrutcarpenter",
>>>>>>> 4d4871a0a71c6e1fbe0b70fe0c170dd5dadcb6fd
	:database => "piler"
	})

ActiveRecord::Base.logger = Logger.new(STDOUT)