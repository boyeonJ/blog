---
date: '2024-02-28'
title: 'Next.js에서 RCC를 사용해야 하는 경우'
categories: ['Next.js']
summary: 'Next.js에서 RCC를 사용해야 하는 경우'
---

# creatContext
createContext는 client component에서만 사용할 수 있습니다. 저는 **react query**를 layout에 추가해주려고 할때 아래의 오류가 발생했습니다. 

![react-query-context-error](./assets/react-query-context-error.png)


저는 이 오류를 전체 layout을 client component로 만들지 않고  createContext가 쓰이는 부분을 따로 client component으로 만들어 해결하였습니다.

```jsx
//provider.tsx
'use client'
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const QueryProviders = ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

//layout.tsx
import { QueryProviders } from "./providers";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
            <body>
                <main>
                    <QueryProviders>
                        {children}
                    </QueryProviders>
                </main>
            </body>
        </html>
    )
}
```