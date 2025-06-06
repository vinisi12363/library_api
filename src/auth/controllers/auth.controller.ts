import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { authRequestDto } from '../dto/post-auth.dto';
import { AuthGuard } from '../guard/auth.guard';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    login(@Body(new ValidationPipe()) authDTO: authRequestDto){0
        return this.authService.signIn( authDTO.email,  authDTO.password)
    }_

      @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
