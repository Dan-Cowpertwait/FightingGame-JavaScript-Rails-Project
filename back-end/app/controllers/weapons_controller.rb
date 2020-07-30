class WeaponsController < ApplicationController

    def index
      if params[:character_id]
        @weapons = Character.find(params[:character_id]).weapons
      else 
        @weapons = Weapon.all
      end
        render json: @weapons
      end
    
      def show
        @weapon = Weapon.find(params[:id])
        render json: @weapon
      end
    
      def create
        @weapon = Weapon.create(weapon_params)
        render json: @weapon
      end
    
      def update
        @weapon = Weapon.find(params[:id])
        @weapon.update(weapon_params)
        if @weapon.save
          render json: @weapon
        else
          render json: {errors: @weapon.errors.full_messages}, status: 422
        end
      end
    
      private
    
      def weapon_params
        params.require(:weapon).permit(:name, :design, :power, :defence, :character_id)
      end

end
