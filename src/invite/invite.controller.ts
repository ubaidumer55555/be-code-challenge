import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { InviteService } from './invite.service';
import { SendInviteDto, ValidateTokenDto } from './dto/invite.dto';
import { JwtAuthGuard } from 'src/util/decorator/auth/auth.guard';
import { RoleGuard } from 'src/util/decorator/auth/role.guard';
import { Roles } from 'src/util/decorator/custom/roles.decorator';
import { UserRole } from 'src/util/enum/user-role.enum';

@Controller('/invites')
export class InviteController {
  constructor(private inviteService: InviteService) {}

  @Post('/send')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  sendInvite(@Body() dto: SendInviteDto) {
    return this.inviteService.sendInvite(dto);
  }

  @Post('/resend')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  resendInvite(@Body() dto: SendInviteDto) {
    return this.inviteService.resendInvite(dto);
  }

  @Post('/validate')
  @UseGuards(JwtAuthGuard)
  validateInvite(@Body() dto: ValidateTokenDto) {
    return this.inviteService.validateInvite(dto);
  }
}
