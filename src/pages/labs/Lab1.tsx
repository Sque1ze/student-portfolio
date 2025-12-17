import { Card, CardContent, CardHeader } from '../../components/ui/card'

type User = {
  id: number
  name: string
  role: string
  avatarUrl: string
}

const users: User[] = [
  {
    id: 1,
    name: 'Leanne Graham',
    role: 'Frontend Developer',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leanne',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    role: 'Backend Developer',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ervin',
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    role: 'UI/UX Designer',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Clementine',
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    role: 'QA Engineer',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Patricia',
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    role: 'Project Manager',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chelsey',
  },
  {
    id: 6,
    name: 'Dennis Schulist',
    role: 'DevOps Engineer',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dennis',
  },
  {
    id: 7,
    name: 'Kurtis Weissnat',
    role: 'Fullstack Developer',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kurtis',
  },
]

function ProfileCard({ user }: { user: User }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 flex items-center gap-4">
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="h-14 w-14 rounded-full bg-white/50"
        />
        <div className="min-w-0">
          <div className="font-semibold truncate">{user.name}</div>
          <div className="text-sm text-[hsl(var(--muted-foreground))] truncate">{user.role}</div>
        </div>
      </CardContent>
    </Card>
  )
}

export function Lab1() {
  return (
    <Card>
      <CardHeader>
        <div className="text-2xl font-bold">Lab 1 — User Profiles</div>
        <div className="text-sm text-[hsl(var(--muted-foreground))]">
          Realization “User Profiles”.
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((u) => (
            <ProfileCard key={u.id} user={u} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
