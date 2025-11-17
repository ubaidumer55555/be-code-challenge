import { BadRequestException, Injectable } from '@nestjs/common';
import { InviteRepository } from './invite.repository';
import { randomBytes } from 'crypto';

@Injectable()
export class InviteService {
  constructor(private readonly inviteRepository: InviteRepository) {}

  private generateToken(): string {
    return randomBytes(32).toString('hex');
  }

  private getExpiry(hours = 24): Date {
    const date = new Date();
    date.setHours(date.getHours() + hours);
    return date;
  }

  async sendInvite(dto: { email: string }) {
    const token = this.generateToken();

    await this.inviteRepository.createInvite({
      email: dto.email,
      token,
      expiresAt: this.getExpiry(24),
    });

    console.log(`Invite token -> ${token}`);

    return { message: 'Invite sent', token };
  }

  async validateInvite(dto: { token: string }) {
    const invite = await this.inviteRepository.findInviteByToken(dto.token);

    if (!invite) return false;

    if (invite.expiresAt < new Date()) {
      return false;
    }

    return true;
  }

  async resendInvite(dto: { email: string }) {
    const existing = await this.inviteRepository.findInviteByEmail(dto.email);

    if (!existing) throw new BadRequestException('Invite not found');

    const newToken = this.generateToken();
    existing.token = newToken;
    existing.expiresAt = this.getExpiry(24);

    await this.inviteRepository.updateInvite(existing.id, existing);

    console.log(`Resent invite token -> ${newToken}`);

    return { message: 'Invite resent', token: newToken };
  }
}
