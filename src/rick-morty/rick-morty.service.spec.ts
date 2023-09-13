//rick-morty.service.spec.ts:
import { Test, TestingModule } from '@nestjs/testing';
import { RickAndMortyService } from './rick-morty.service';

describe('RickMortyService', () => {
  let service: RickAndMortyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RickAndMortyService],
    }).compile();

    service = module.get<RickAndMortyService>(RickAndMortyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
