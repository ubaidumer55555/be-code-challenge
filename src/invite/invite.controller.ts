import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { InviteService } from './invite.service';
import { SendInviteDto, ValidateTokenDto } from './dto/invite.dto';
import { JwtAuthGuard } from 'src/util/decorator/auth/auth.guard';
import { RoleGuard } from 'src/util/decorator/auth/role.guard';
import { Roles } from 'src/util/decorator/custom/roles.decorator';
import { UserRole } from 'src/util/enum/user-role.enum';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('invites')
@ApiBearerAuth()
@Controller('/invites')
export class InviteController {
  constructor(private inviteService: InviteService) {}

  @Post('/send')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Send invite' })
  @ApiResponse({ status: 201, description: 'Invite sent' })
  @ApiBody({
    type: SendInviteDto,
    examples: {
      default: {
        summary: 'Send invite',
        value: { email: 'invitee@example.com' },
      },
    },
  })
  sendInvite(
    @Body() dto: SendInviteDto,
  ): Promise<{ message: string; token: string }> {
    return this.inviteService.sendInvite(dto);
  }

  @Post('/resend')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Resend invite' })
  @ApiResponse({ status: 200, description: 'Invite resent' })
  @ApiBody({
    type: SendInviteDto,
    examples: {
      default: {
        summary: 'Resend invite',
        value: { email: 'invitee@example.com' },
      },
    },
  })
  resendInvite(
    @Body() dto: SendInviteDto,
  ): Promise<{ message: string; token: string }> {
    return this.inviteService.resendInvite(dto);
  }

  @Post('/validate')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Validate invite token' })
  @ApiResponse({ status: 200, description: 'Returns boolean validity' })
  @ApiBody({
    type: ValidateTokenDto,
    examples: {
      default: {
        summary: 'Validate token',
        value: { token: 'token-hex-string' },
      },
    },
  })
  validateInvite(@Body() dto: ValidateTokenDto): Promise<boolean> {
    return this.inviteService.validateInvite(dto);
  }
}
