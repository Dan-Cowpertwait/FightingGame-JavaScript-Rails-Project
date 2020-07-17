class CharactersController < ApplicationController

    def index
        @characters = Character.all
        render json: @characters
      end
    
      def show
        @character = Character.find(params[:id])
        render json: @character
      end
    
      def create
        @character = Character.create(character_params)
        render json: @character
      end
    
      def update
        @character = Character.find(params[:id])
        @character.update(character_params)
        if @character.save
          render json: @character
        else
          render json: {errors: @character.errors.full_messages}, status: 422
        end
      end

      def destroy
        @character = Character.find(params[:id])
        @character.destroy
        render json: {message: "Player deleted"}
      end
    
    
      private
    
      def character_params
        params.require(:character).permit(:name, :rpgclass, :health, :defence)
      end

end
