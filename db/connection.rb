require "active_record"
require_relative "../lib/comment.rb"
require_relative "../lib/neighborhood.rb"
require_relative "../lib/report.rb"
require_relative "../lib/user.rb"

ActiveRecord::Base.establish_connection({
	:adapter => "postgresql",
	:host => "",
	:username => "root",
	:database => "piler"
	})

ActiveRecord::Base.logger = Logger.new(STDOUT)