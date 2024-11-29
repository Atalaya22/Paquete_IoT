GO

/****** Object:  Table [dbo].[MXP_Apilador]    Script Date: 2/13/2021 9:30:42 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[MXP_Apilador](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Inici] [datetime] NOT NULL,
	[Duracio] [time](7) NOT NULL,
	[Final] [datetime] NOT NULL,
	[EstatId] [tinyint] NOT NULL,
	[InfoId] [smallint] NOT NULL,
	[AlarmaId] [smallint] NOT NULL,
	[ProducteId] [smallint] NOT NULL,
	[CaixesTotals] [int] NOT NULL,
 CONSTRAINT [PK_MXP_Apilador] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Temp_MXP_Apilador]    Script Date: 2/13/2021 9:34:04 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Temp_MXP_Apilador](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Inici] [datetime] NOT NULL,
	[EstatId] [tinyint] NOT NULL,
	[InfoId] [smallint] NOT NULL,
	[AlarmaId] [smallint] NOT NULL,
	[ProducteId] [smallint] NOT NULL,
	[CaixesTotals] [int] NOT NULL,
 CONSTRAINT [PK_Temp_MXP_Apilador] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[MXP_Apilador_Cadencies]    Script Date: 2/13/2021 9:26:22 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[MXP_Apilador_Cadencies](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Inici] [datetime] NOT NULL,
	[Cadencia] [float] NOT NULL,
 CONSTRAINT [PK_MXP_Apilador_Cadencies] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Info_MXP_Apilador_Productes]    Script Date: 2/13/2021 9:27:16 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Info_MXP_Apilador_Productes](
	[Id] [int] NOT NULL,
	[Nom] [varchar](max) NOT NULL,
	[Inici] [datetime] NOT NULL,
	[IdIntern] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_Info_MXP_Apilador_Productes] PRIMARY KEY CLUSTERED 
(
	[IdIntern] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Info_MXP_Apilador_Alarmes]    Script Date: 2/13/2021 9:27:08 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Info_MXP_Apilador_Alarmes](
	[ID] [int] NOT NULL,
	[en] [varchar](255) NULL,
	[ca] [varchar](255) NULL,
	[fr] [varchar](255) NULL,
	[es] [varchar](255) NULL,
	[grup_en] [varchar](50) NULL,
	[grup_ca] [varchar](50) NULL,
	[grup_fr] [varchar](50) NULL,
	[grup_es] [varchar](50) NULL,
 CONSTRAINT [PK_Info_MXP_Apilador_Alarmes] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Info_MXP_Apilador_Info]    Script Date: 2/13/2021 9:26:59 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Info_MXP_Apilador_Info](
	[Id] [int] NOT NULL,
	[Ca] [varchar](max) NULL,
	[Es] [varchar](max) NULL,
	[En] [varchar](max) NULL,
 CONSTRAINT [PK_Info_MXP_Apilador_Info] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Info_MXP_Apilador_Estats]    Script Date: 2/13/2021 9:26:55 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Info_MXP_Apilador_Estats](
	[Id] [int] NOT NULL,
	[Nom] [varchar](100) NULL,
	[Color] [varchar](100) NULL,
	[Ca] [varchar](100) NULL,
	[Es] [varchar](100) NULL,
	[En] [varchar](100) NULL,
 CONSTRAINT [PK_Info_MXP_Apilador_Estats] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO