require "sinatra"
require "sinatra/reloader"
require "pry"
require "active_support"
require "json"
require_relative "./db/connection.rb"
require_relative "./lib/comment.rb"
require_relative "./lib/neighborhood.rb"
require_relative "./lib/report.rb"
require_relative "./lib/user.rb"

after do 
	ActiveRecord::Base.connection.close
end

get "/" do
	erb(:index)
end


#Reports routes
get "/reports" do
	content_type :json
	reports = Report.all
	reports.to_json
end

get "/reports/:id" do
	content_type(:json)
	report = Report.find(params["id"])
	report.to_json
end

post "/reports" do
	content_type(:json)
	hash = JSON.parse(request.body.read)
	report = Report.create(hash)
	report.to_json
end

put "/reports/:id" do
	content_type(:json)
	report = Report.find(params["id"])
	hash = JSON.parse(request.body.read)
	report.update(hash)
	hash.to_json
end

delete "/reports/:id" do
	content_type(:json)
	report = Report.find(params["id"])
	report.destroy
	report.to_json
end



get "/reports/:id/comments" do
	content_type(:json)
	comments = Comment.where({report_id: params["id"]})
	comments.to_json
end

#Users routes
get "/users" do
	content_type(:json)
	users = User.all
	users.to_json
end

get "/users/:id" do
	content_type(:json)
	user = User.find(params["id"])
	user.to_json
end

post "/users" do
	content_type(:json)
	hash = JSON.parse(request.body.read)
	user = User.create(hash)
	user.to_json
end

put "/users/:id" do
	content_type(:json)
	hash = JSON.parse(request.body.read)
	user = User.find(params["id"])
	user.update(hash)
	user.to_json
end

delete "/users/:id" do
	content_type(:json)
	user = User.find(params["id"])
	user.destroy
	user.to_json
end

get "/users/:id/reports" do
	content_type(:json)
	reports = Report.where( {user_id: params["id"]})
	reports.to_json
end

get "/users/:id/comments" do
	content_type(:json)
	comments = Comment.where( {user_id: params["id"]})
	comments.to_json
end

#Neighborhoods routes
get "/neighborhoods" do
	content_type(:json)
	neighborhoods = Neighborhood.all
	neighborhoods.to_json
end

get "/neighborhoods/:id/reports" do
	content_type(:json)
	reports = Report.where( {neighborhood_id: params["id"]})
	reports.to_json
end

