class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  def csrf_token
    render json: { csrf_token: form_authenticity_token }
  end

  # Allow requests from localhost:3001 (React frontend)
  def verified_request?
    super || request.origin == "http://localhost:3001"
  end
end
