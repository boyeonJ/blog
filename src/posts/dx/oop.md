---
date: '2024-05-04'
title: 'Typescript로 객체지향 프로그래밍 구현하기'
categories: ['DX', 'Typescript']
summary: 'Typescript로 OOP를 구현해봅시다.'
---

객체지향 프로그래밍이란 프로그램을 명령어들의 목록으로 보는 시각에서 벗어나 부품들의 조합으로 보는 패러다임입니다. 
객체지향 프로그래밍 패러다임을 따른 프로그램은 SOLID라는 5가지의 원칙을 지킨 프로그램이며 그로 인하여 추상화, 상속, 캡슐화, 다형성 이라는 특징을 가집니다. 
이러한 특징을 가지는 프로그램은 신뢰성, 확장성, 유지보수성이 좋습니다.
자바스크립트 생태계는 지속적으로 발전하고 있습니다. 
ES6이후 class가 등장하면서 본격적으로 자바스크립트로도 객체지향 프로그래밍 패러다임을 따를 수 있게 되었습니다.

# 1. Encapsulation
캡슐화란 외부에서 클래스 내부의 데이터들에 접근하지 못하도록 정보를 은닉하는 것을 의미합니다. 
이러한 객체지향 프로그래밍 특징을 통해 프로그램의 **신뢰도는 올라**갑니다.

## Typescript에서 Encapsulation
각각 프로퍼티와 메서드 앞에 private, protected, public keyword를 통해 Encapsulation을 구현할 수 있습니다. 

# 2. Abstraction
추상화란 외부에서 클래스 내부의 구체적인 구현에 대해 공개하지 않고 **오직 필요한 인터페이스만을 노출**함으로써 이루어집니다. 
이를 통해 클래스의 사용자는 클래스의 기능을 이해하기 쉽고, 클래스가 변경되더라도 사용자의 코드에 영향을 미치지 않도록 할 수 있습니다. 
따라서 **가독성과 유지보수성을 향상**시킬 수 있습니다. 

## Typescript에서 Abstraction
Typescript에서는 interface를 implements 또는 class를 extends 하는 방식으로 추상화를 구현할 수 있습니다.
```typescript
interface Shape {
    calculateArea(): number;
}

class Circle implements Shape {
    constructor(private radius: number) {}

    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle implements Shape {
    constructor(private width: number, private height: number) {}

    calculateArea(): number {
        return this.width * this.height;
    }
}

//또는
abstract class Shape {
    abstract calculateArea(): number;
}

class Circle extends Shape {
    constructor(private radius: number) {
        super();
    }

    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle extends Shape {
    constructor(private width: number, private height: number) {
        super();
    }

    calculateArea(): number {
        return this.width * this.height;
    }
}
```

# 추가적인 내용

## getter, setter
getter와 setter는 객체 지향 프로그래밍에서 사용되는 개념입니다. 이 둘은 사실상 매서드인데요. getter는 객체의 프로퍼티를 반환하는 매서드, setter는 프로퍼티를 변경 및 설정하는 매서드입니다. 객체 지향 프로그래밍에서는 객체의 데이터를 **외부에서 직접적으로 접근하는 것을 막습니다**. 이는 무결성을 지키기 위함입니다. 따라서 객체지향 프로그래밍에서는 객체에 직접 접근하는것이 아닌 매소드를 통해 접근하는 것을 선호합니다.
### setter
setter는 외부에서 데이터를 변경 및 설정할때 유효한 값만 저장할 수 있도록 해주어 무결성을 지킵니다. 예를 들어 자동차 클래스에서 속도 프로퍼티를 생성시 마이너스 값이면 저장할 수 없게 해줄 수 있습니다.
> 일반 매서드는 매서드 호출하여야 하지만 setter 매서드는 일반 프로퍼티값을  변경하는것처럼 사용할 수 있습니다.
```typescript
class Automobile {
	//...
	set speed(speed:number {
		if(number < 0){
			this.speed = 0
			return;
		}
		
		this.speed = speed;
	}
}

const automobile = new Automobile();
automobile.speed = 4;
```

### getter
getter는 프로퍼티에 직접 접근하는 값이 아닌 가공한 값이 필요할 경우 사용할 수 있습니다. 가공한 값은 getter를 통해서 읽어와야 중간에 변경된 값을 가져올 수 있습니다. 그 이유는 계산이 필요한 프로퍼티는 constructor가 호출되는 시점에 값이 반영되기 때문입니다.

> 일반 매서드는 매서드 호출하여야 하지만 getter 매서드는 일반 프로퍼티값을 읽어오는 것처럼 사용할 수 있습니다.
```typescript
class User {
	constructor(firstName: string, lastName:string) {
		this.firstName = firstName;
		this.lastName = lastName;
		//계산이 필요한 프로퍼티
		this.fullName = `${firstName} ${lastName}`;
	}
}

cnost user = new User('Jeong', 'Boyeon');
user.firstName = 'Ellie';
console.log(user.fullName); //Jeong Boyeon -> 반영 안됨
```
```typescript
class User {
	get fullName() {
		return `${this.firstName} ${this.lastName}`;
	}

	constructor(firstName: string, lastName:string) {}
}

cnost user = new User('Jeong', 'Boyeon');
user.firstName = 'Ellie';
console.log(user.fullName); //Ellie Boyeon -> 반영됨
```

## constructor를 캡슐화
생성자를 통해 직접 인스턴스를 생성하는 것을 금지하는 방법은 무엇이 있을까요? 바로 constructor를 private로 만들어주는 방법이 있습니다. 그러면 해당 class는 어떻게 인스턴스를 만들 수 있을까요? 바로 class 내부에 인스턴스를 생성해주는 정적 메서드를 제공해주면 됩니다. 이를 통해 클래스의 내부 상태를 보호하고, 사용자가 의도하지 않은 방식으로 클래스를 사용하는 것을 방지할 수 있습니다.
```typescript
class Rectangle {
	...
	
	constructor(width: number, height: number) {}
	
	static makeRectangle(width: number, height:number): Rectangle {
		return new Rectangle(width, height);
	}
}
```
이러한 방식은 싱글톤 패턴이나 팩토리 메서드 패턴에 주로 사용됩니다. 그리고 클래스의 사용자가 인스턴스를 오직 특정 조건에서만 생성하도록 강제하고 싶을 때도 사용할 수 있습니다.

## constructor Inheritance
자식 클래스에서 constructor를 정의하려면 부모의 constructor를 호출해주어야 한다.
```typescript
class OTT {
	constructor(movieCount: number){}
}

class Netflix {
	constructor(movieCount: number, netfilxOnly: number){
		super(movieCount);
	}
}
```
