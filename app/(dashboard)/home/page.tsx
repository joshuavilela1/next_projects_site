import { delay } from '@/lib/async';
import { getUserFromCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Suspense } from 'react';
import Greetings from '@/components/Greetings';
import GreetingsSkeleton from '@/components/GreetingsSkeleton';
import ProjectCard from '@/components/ProjectCard';
import TaskCard from '@/components/TaskCard';
import NewProject from '@/components/NewProject';

const getData = async () => {
  await delay(2000);
  const user = await getUserFromCookie(cookies());
  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  return { projects };
};

export default async function Page() {
  const { projects } = await getData();

  return (
    <div className="w-full h-full pr-6 overflow-y-auto">
      <div className=" h-full items-stretch justify-center min-h-[content]">
        <div className="flex flex-1 grow">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Greetings />
          </Suspense>
        </div>
        <div className="flex flex-wrap items-center p-5 mt-3 -m-3 flex-2 grow">
          {projects.map((project) => (
            //! Remember Implicit vs Explicit Returns
            <div className="w-1/3 p-3" key={project.id}>
              <Link href={`/project/${project.id}`}>
                <ProjectCard project={project} />
              </Link>
            </div>
          ))}
          <div className="w-1/3 p-3">
            <NewProject />
          </div>
        </div>
        <div className="flex w-full px-5 mt-6">
          <div className="w-full">
            <TaskCard />
          </div>
        </div>
      </div>
    </div>
  );
}
