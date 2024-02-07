import { Badge } from './ui/badge';
import { Card } from './ui/card';
import Link from 'next/link';

const CampaignListItem = () => {
  return (
    <Link href='campaigns/45a54668'>
      <Card className='hover:border hover:shadow-xl hover:shadow-primary/5 transition-colors hover:border-primary/80 flex flex-col'>
        <div className='p-4 border-b'>
          <div className='flex justify-between items-start gap-2'>
            <h3 className='font-semibold text-lg leading-tight'>
              Senior React Frontend Developer
            </h3>
            <Badge>Running</Badge>
          </div>
          <span className='text-sm opacity-60 text-right'>
            Tuesday, 13th Apr 20PM
          </span>
        </div>
        <div className='p-4 flex flex-col gap-4'>
          <div>
            <div className='flex items-center justify-between'>
              <b className='opacity-80 text-xs'>Start</b>
              <span className='font-medium opacity-70 text-right'>
                Tuesday, 13th Apr 20PM
              </span>
            </div>
            <div className='flex items-center justify-between'>
              <b className='opacity-80 text-xs'>End</b>
              <span className='font-medium opacity-70 text-right'>
                Friday, 21th Apr 20PM
              </span>
            </div>
          </div>
          <div className='flex flex-wrap gap-1'>
            <div className='bg-secondary flex-1 border rounded-tl-lg rounded-bl-lg p-2'>
              <span className='font-medium opacity-90 text-xs'>Candidates</span>
              <br />
              <b className='font-bold text-xl text-primary'>52</b>
            </div>
            <div className='bg-secondary flex-1 border p-2'>
              <span className='font-medium opacity-90 text-xs'>Limit</span>
              <br />
              <b className='font-bold text-xl text-primary'>52</b>
            </div>
            <div className='bg-secondary flex-1 border rounded-tr-lg rounded-br-lg p-2'>
              <span className='font-medium opacity-90 text-xs'>Acceptance</span>
              <br />
              <b className='font-bold text-xl text-primary'>52%</b>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CampaignListItem;
