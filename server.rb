require 'bundler/setup'
Bundler.require(:default)

require 'sinatra'

require_relative "./db/connection.rb"
require_relative "./lib/comment.rb"
require_relative "./lib/neighborhood.rb"
require_relative "./lib/report.rb"
require_relative "./lib/user.rb"
require "active_support"

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
	reports = Report.create(report_params(params))
	reports.to_json
end

put "/reports/:id" do
	content_type(:json)
	report = Report.find(params[:id])
	report.update(report_params(params))
	report.to_json
end

delete "/reports/:id" do
	content_type(:json)
	report = Report.find(params["id"])
	report.destroy
end


get "/reports/:id/comments" do
	content_type(:json)
	comments = Comment.where({report_id: params["id"]})
	comments.to_json
end

post "/comments" do
	content_type(:json)
	comment = Comment.create(comment_params(params))
	comment.to_json
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
	user = User.create(user_params(params))
	user.to_json
end

put "/users/:id" do
	content_type(:json)
	user = User.find(params[:id])
	user.update(user_params(params))
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

get "/neighborhoods/:id" do
	content_type(:json)
	neighborhood = Neighborhood.find(params["id"])
	neighborhood.to_json
end

get "/neighborhoods/:id/reports" do
	content_type(:json)
	reports = Report.where({neighborhood_id: params["id"]})
	reports.to_json
end


def report_params(params)
  params.slice(*Report.column_names)
end

def comment_params(params)
  params.slice(*Comment.column_names)
end

def user_params(params)
  params.slice(*User.column_names)
end





